import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://127.0.0.1:8000/api/customers';

  constructor(private http: HttpClient) { }
  getCustomers(): Observable<Customer[]>{
    return this.http.get<any>(this.apiUrl);
  }
}
