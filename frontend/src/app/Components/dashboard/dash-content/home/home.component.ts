import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastComponent } from '../../../toast/toast.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
records: RecordItem[] = [
    {
      id: 1,
      name: 'حمادة شعبان عاطف بورعي',
      total: 50,
      required: 50,
      received: 50,
      price: 50,
      showDropdown: false,
    },
    {
      id: 2,
      name: 'برعي',
      total: 50,
      required: 50,
      received: 50,
      price: 50,
      showDropdown: false,
    },
    {
      id: 3,
      name: 'حمادة بورعي',
      total: 50,
      required: 50,
      received: 50,
      price: 50,
      showDropdown: false,
    },
  ];

  toastMessage = '';
  toastType: 'error' | 'success' | 'info' | 'warning' = 'error';

  toggleDropdown(record: RecordItem) {
    this.records.forEach(element => {
      if(element.showDropdown && element.id != record.id){
        element.showDropdown = false;
      }
    });
    record.showDropdown = !record.showDropdown;
  }

  resetRecord(record: RecordItem) {
    this.toastType = 'info';
    this.toastMessage = `record name: ${record.name}`;
  }

  updateRecord(record: RecordItem) {
    console.log('Update', record);
  }

  deleteRecord(record: RecordItem) {
    console.log('Delete', record);
  }
}
export interface RecordItem {
  id: number;
  name: string;
  total: number;
  required: number;
  received: number;
  price: number;
  showDropdown: boolean;
}