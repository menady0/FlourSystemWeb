import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  activeIndex = 0;
  indicatorX = 0; // X position for the indicator
  // Define your routes in the same order as your nav
  readonly routes = ['home', 'statistics', 'settings'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        const foundIndex = this.routes.findIndex(r => url.includes(r));
        this.activeIndex = foundIndex !== -1 ? foundIndex : 0;
        setTimeout(() => this.setIndicatorToActive(), 0); // Set indicator position after view updates
      });
  }

  setIndicatorToActive() {
    // Find the nav item for the current activeIndex
    const navList = document.querySelector('ul');
    if (!navList) return;
    const navItems = navList.querySelectorAll('.nav-icon');
    const target = navItems[this.activeIndex] as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      const parentRect = navList.getBoundingClientRect();
      this.indicatorX = rect.left - parentRect.left + rect.width / 2 - 35;
    }
  }

  setActive(index: number, event?: MouseEvent) {
    this.activeIndex = index;
    if (event) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement?.parentElement?.getBoundingClientRect();
      if (parentRect) {
        this.indicatorX = rect.left - parentRect.left + rect.width / 2 - 35;
      }
    } else {
      setTimeout(() => this.setIndicatorToActive(), 0);
    }
  }
}
