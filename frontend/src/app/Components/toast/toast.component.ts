import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ToastComponent implements OnChanges {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'info';

  animationState: 'in' | 'out' | '' = '';
  private autoHideTimeout: any;
  private fadeOutTimeout: any;

  ngOnChanges() {
    if (this.message) {
      this.animationState = 'in';

      // Auto-hide after 3s
      clearTimeout(this.autoHideTimeout);
      clearTimeout(this.fadeOutTimeout);

      this.autoHideTimeout = setTimeout(() => {
        this.closeToast();
      }, 3000);
    }
  }

  closeToast() {
    if (this.animationState !== 'out') {
      this.animationState = 'out';

      this.fadeOutTimeout = setTimeout(() => {
        this.message = '';
        this.animationState = '';
      }, 500); // match fade-out animation duration
    }
  }

  toastClasses: Record<string, string> = {
    error: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-400 text-black',
  };

  toastIcons: Record<string, string> = {
    error: 'fa-solid fa-circle-xmark',
    success: 'fa-solid fa-circle-check',
    info: 'fa-solid fa-circle-info',
    warning: 'fa-solid fa-triangle-exclamation',
  };
}
