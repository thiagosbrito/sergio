import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() loaderId: string = '';

  constructor(private ngxLoaderService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxLoaderService.start(this.loaderId);
  }

}
