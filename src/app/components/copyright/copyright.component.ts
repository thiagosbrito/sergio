import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent implements OnInit {

  currentYear: number | undefined;

  constructor() {
    this.currentYear = new Date().getFullYear()
  }

  ngOnInit(): void {
  }

}
