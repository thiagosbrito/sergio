import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent implements OnInit {

  currentYear: number | undefined;
  @Input() currentPage: string = '';
  @Input() totalPages: number | undefined = 0;

  constructor() {
    this.currentYear = new Date().getFullYear()
    console.log(this.currentPage);
    console.log(this.totalPages);
  }

  ngOnInit(): void {
  }

}
