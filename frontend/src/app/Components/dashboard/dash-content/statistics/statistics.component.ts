import { Component, OnInit } from '@angular/core';
import { Quota } from '../../../../core/interfaces/quota.interface';
import { StatisticsService } from '../../../../core/services/statistics.service';
import { ToastComponent } from "../../../toast/toast.component";

@Component({
  selector: 'app-statistics',
  imports: [ToastComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  toastMessage = '';
  toastType: 'error' | 'success' | 'info' | 'warning' = 'error';

  quotaReceived: Number = 0;
  totalSales: Number = 0;
  balance: Number = 0;
  balanceDelivered: Number = 0;
  dailySales: Number = 0;
  totalCards: Number = 0;

  constructor(private statistics: StatisticsService){}

  ngOnInit(){
    this.loadStats();
  }
  loadStats(): void{
    const day = new Date().getDate();
    const [currentMonth, currentYear] = this.statistics.getCurrentMonthYear();
    
    // Quota Received
    this.statistics.getQuotasThisMonth().subscribe({
      next: (count) => {
        this.quotaReceived = count;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل الإحصائيات (Quota Received): ${err}`;
      }
    });

    // Total Sales
    this.statistics.getTotalSales(currentMonth, currentYear).subscribe({
      next: (total) => {
        this.totalSales = total;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل الإحصائيات (Total Sales): ${err}`;
      }
    });

    // Daily Sales
    this.statistics.getDailySales(day ,currentMonth, currentYear).subscribe({
      next: (daily) => {
        this.dailySales = daily;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل الإحصائيات (Daily Sales): ${err}`;
      }
    });

    // Balance
    this.statistics.getBalance().subscribe({
      next: (b) => {
        this.balance = b;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل الإحصائيات (balance): ${err}`;
      }
    });

    // Balance Delivered
    this.statistics.getBalanceDelivered().subscribe({
      next: (bd) => {
        this.balanceDelivered = bd;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل الإحصائيات (Balance Delivered): ${err}`;
      }
    });

    // Total Cards
    this.statistics.getTotalCards().subscribe({
      next: (total) => {
        this.totalCards = total;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل الإحصائيات (Total Cards): ${err}`;
      }
    });
  }
}
