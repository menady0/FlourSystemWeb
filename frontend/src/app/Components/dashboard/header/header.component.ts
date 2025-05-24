import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageTitleService } from '../../../core/services/page-title.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title$!: Observable<string>;
  constructor(private pageTitleService: PageTitleService) {}
  ngOnInit() {
    this.title$ = this.pageTitleService.title$;
  }
}