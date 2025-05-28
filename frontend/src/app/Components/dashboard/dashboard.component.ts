import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { PageTitleService } from '../../core/services/page-title.service';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, NavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  desktopAppUrl: string | null = null;

  constructor(private router: Router, private pageTitleService: PageTitleService, private http: HttpClient) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      let title = 'لوحة التحكم';
      if (url.includes('home')) title = 'الرئيسية';
      else if (url.includes('statistics')) title = 'الإحصائيات';
      else if (url.includes('settings')) title = 'الإعدادات';
      this.pageTitleService.setTitle(title);
    });

        const jsonUrl = 'https://raw.githubusercontent.com/menady0/FlourSystem/main/update-info.json';
        this.http.get<{url: string}>(jsonUrl).subscribe({
          next: (data) => {
            this.desktopAppUrl = data.url
          }
        })
  }
}