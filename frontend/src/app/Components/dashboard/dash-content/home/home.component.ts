import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../../toast/toast.component';
import { CustomerService } from '../../../../core/services/customer.service';
import { Customer } from '../../../../core/interfaces/customer.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService){}
  ngOnInit(){
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.sort((a, b) => a.customerIndex - b.customerIndex);
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = `تعذر تحميل البيانات: ${err}`;
      }
    });
  }

  toastMessage = '';
  toastType: 'error' | 'success' | 'info' | 'warning' = 'error';

  toggleDropdown(customer: Customer) {
    this.customers.forEach(element => {
      if(element.showDropdown && element.CustomerID != customer.CustomerID){
        element.showDropdown = false;
      }
    });
    customer.showDropdown = !customer.showDropdown;
  }

  resetRecord(customer: Customer) {
    this.toastType = 'info';
    this.toastMessage = `record name: ${customer.OwnerName}`;
  }

  updateRecord(customer: Customer) {
    console.log('Update', customer);
  }

  deleteRecord(customer: Customer) {
    console.log('Delete', customer);
  }
}