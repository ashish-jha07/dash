import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  // isLoading : boolean= false
  // show() {
  //   console.log('show function call')
  //     this.isLoading= true
  // }
  // hide() {
  //     this.isLoading= false
  // }

  isLoading = new Subject<boolean>();
  // public isLoading = new BehaviorSubject(false);

  show() {
    console.log('show method call')
      this.isLoading.next(true);
  }
  hide() {
    console.log('hide  method call')
      this.isLoading.next(false);
  }

}
