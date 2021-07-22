import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private ngxLoaderService: NgxUiLoaderService) { }

  stopLoader(loaderId: string) {
    console.log('service has been called');
    this.ngxLoaderService.stop(loaderId);
  }
}
