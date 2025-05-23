import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ToastComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  
  constructor(private http: HttpClient){}
  
  toastMessage = '';
  toastType: 'error' | 'success' | 'info' | 'warning' = 'error';

  onSubmit(){
    const url = ""; // Endpoint
    
    interface LoginResponse {
      token: string;
      user: {
        id: number;
        name: string;
      };
    }

    this.http.post<LoginResponse>(url, this.loginData).subscribe({
      next: (res) => {
        // console.log('login successed', res);
        localStorage.setItem('token', res.token); // res.token is what the backend gave you
        localStorage.setItem('userID', res.user.id.toString());
        localStorage.setItem('name', res.user.name);
        // this.errorMessage = '';
      },
      error: (err) => {
        // console.log('login failed', err);
        this.toastType = 'error';
        this.toastMessage = 'اسم المستخدم أو كلمة المرور غير صحيحة';

        // this.errorMessage = "اسم المستخدم أو كلمة المرور غير صحيحة";
      }
    });
  }
}
