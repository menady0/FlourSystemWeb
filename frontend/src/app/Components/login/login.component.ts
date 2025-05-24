import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // Adjust path
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toastMessage = '';
  toastType: 'error' | 'success' | 'info' | 'warning' = 'error';

  onSubmit(){
    this.authService.login(this.loginData.username, this.loginData.password).subscribe({
      next: () => {
        this.toastType = 'success';
        this.toastMessage = 'تم تسجيل الدخول بنجاح!';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('login failed', err);
        this.toastType = 'error';
        this.toastMessage = 'اسم المستخدم أو كلمة المرور غير صحيحة';
      }
    });
  }
}