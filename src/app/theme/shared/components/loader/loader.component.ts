import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {LoaderService   } from './../loader.service'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 100;
  // isLoading: Boolean= this.loaderService.isLoading;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  loading: boolean;

  constructor(private loaderService : LoaderService) { 
    // this.loaderService.isLoading.subscribe((v) => {
    //   console.log(v);
    //   this.loading = v;
    // });
  }

 

}
