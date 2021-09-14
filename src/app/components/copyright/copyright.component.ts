import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {

  currentYear: number | undefined;

  @Input() currentPage: string = '';
  @Input() totalPages: number | null = 0;

  constructor() {
    this.currentYear = new Date().getFullYear()
  }
}
