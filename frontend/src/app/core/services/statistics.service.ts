import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Quota } from '../interfaces/quota.interface';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrlQuota = "http://127.0.0.1:8000/api/quotas";
  private apiUrlStore = "http://127.0.0.1:8000/api/stores";

  constructor(private http: HttpClient) { }
  
  // ------------------------------------
  // Quota Table
  // ------------------------------------
  private getQuotaTable(): Observable<Quota[]> {
    return this.http.get<Quota[]>(this.apiUrlQuota);
  }

  getQuotasThisMonth(): Observable<number> {
    const [currentMonth, currentYear] = this.getCurrentMonthYear();

    return this.getQuotaTable().pipe(
      map((quotas: Quota[]) => {
        return quotas.filter(q => {
          const date = new Date(q.DateReceived);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        }).length;
      })
    );
  }


  // ------------------------------------
  // Store Table
  // ------------------------------------
  private getStoreTable(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrlStore);
  }

  totalSales(): Observable<number> {
    const [currentMonth, currentYear] = this.getCurrentMonthYear()
    const [preMonth, preYear] = this.getPreviousMonthYear(currentMonth, currentYear);

    return combineLatest([
      this.getTotalSales(currentMonth, currentYear),
      this.getTotalSales(preMonth, preYear)
    ])
      .pipe(
        map(([currentAmount, previousAmount]) => {
          return previousAmount > 0
            ? currentAmount + previousAmount
            : currentAmount;
        })
      )
  }
  getDailySales(currentDay: number, currentMonth: number, currentYear: number): Observable<number> {
    return this.getStoreTable().pipe(
      map((storeData: Store[]) => {
        return storeData.filter((item) => {
          const date = new Date(item.DateOfOperation);
          return date.getDate() === currentDay && date.getMonth() === currentMonth && date.getFullYear() == currentYear
        }).reduce((sum, item) => sum + item.theReceivedQuantity, 0);
      })
    );
  }
  getTotalSales(currentMonth: number, currentYear: number): Observable<number> {
    return this.getStoreTable().pipe(
      map((storeData: Store[]) => {
        return storeData.filter((item) => {
          const date = new Date(item.DateOfOperation);
          return date.getMonth() === currentMonth && date.getFullYear() == currentYear
        }).reduce((sum, item) => sum + item.theReceivedQuantity, 0);
      })
    );
  }
  getTotalCards(): Observable<number> {
    const [currentMonth, currentYear] = this.getCurrentMonthYear();

    return this.getStoreTable().pipe(
      map((storeData: Store[]) => {
        const filteredByDate = storeData.filter(record => {
          const date = new Date(record.DateOfOperation);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        });
        
        const unique = new Set<number>();
        filteredByDate.forEach(record => {
          unique.add(record.CustomerID);
        })
        return unique.size
      })
    );
  }




  // ------------------------------------
  // Shared Between Quota & Store Tables
  // ------------------------------------
  getCurrentMonthYear(): [number, number] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return [currentMonth, currentYear];
  }
  getPreviousMonthYear(curMonth: number, curYear: number): [number, number] {
    const preMonth = (curMonth === 1) ? 12 : curMonth - 1;
    const preYear = (curMonth === 1) ? curYear - 1 : curYear;
    return [preMonth, preYear];
  }

  getBalance(): Observable<number> {
    return combineLatest([
      this.amountPerKg(),
      this.totalSales()
    ]).pipe(
      map(([amount, total]) => {
        return amount - total;
      })
    );
  }
  getBalanceDelivered(): Observable<number> {
    return combineLatest([
      this.amountPerKg(),
      this.totalSalesDelivered()
    ]).pipe(
      map(([amount, total]) => {
        return amount - total;
      })
    );
  }

  amountPerKg(): Observable<number> {
    const [currentMonth, currentYear] = this.getCurrentMonthYear()
    const [preMonth, preYear] = this.getPreviousMonthYear(currentMonth, currentYear);

    return combineLatest([
      this.getAmountPerKg(currentMonth, currentYear),
      this.getAmountPerKg(preMonth, preYear)
    ])
      .pipe(
        map(([currentAmount, previousAmount]) => {
          return previousAmount > 0
            ? currentAmount + previousAmount
            : currentAmount;
        })
      )
  }


  getAmountPerKg(currentMonth: number, currentYear: number): Observable<number> {
    return this.getQuotaTable().pipe(
      map((Quotas: Quota[]) => {
        return Quotas.filter(item => {
          const date = new Date(item.DateReceived);
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear
        }).reduce((sum, item) => sum + item.AmountPerKG, 0)
      })
    )
  }

  totalSalesDelivered(): Observable<number> {
    const [currentMonth, currentYear] = this.getCurrentMonthYear()
    const [preMonth, preYear] = this.getPreviousMonthYear(currentMonth, currentYear);

    return combineLatest([
      this.getTotalSalesDelivered(currentMonth, currentYear),
      this.getTotalSalesDelivered(preMonth, preYear)
    ])
      .pipe(
        map(([currentAmount, previousAmount]) => {
          return previousAmount > 0
            ? currentAmount + previousAmount
            : currentAmount;
        })
      )
  }
  getTotalSalesDelivered(currentMonth: number, currentYear: number): Observable<number> {
    return this.getStoreTable().pipe(
      map((storeData: Store[]) => {
        return storeData.filter((item) => {
          const date = new Date(item.DateOfOperation);
          return date.getMonth() === currentMonth && date.getFullYear() == currentYear
        }).reduce((sum, item) => sum + item.theDeliveredQuantity, 0);
      })
    );
  }

}
