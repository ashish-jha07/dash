import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { Subject } from 'rxjs/Subject';  
@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private subject = new Subject<any>();  
    constructor() { }  
    confirmThis(message: string, siFn: () => any, noFn: () => any) {  
      console.log('confirm this call')
        this.setConfirmation(message, siFn, noFn);  
    }  
    setConfirmation(message: string, siFn: () => any, noFn: () => any) {  
      console.log('set confirmation call call')
        let that = this;  
        this.subject.next({  
            type: "confirm",  
            text: message,  
            siFn:  
                function () {  
                    that.subject.next(); //this will close the modal  
                    siFn();  
                },  
            noFn: function () {  
                that.subject.next();  
                noFn();  
            }  
        });  
  
    }  
  
    getMessage(): Observable<any> {  
        return this.subject.asObservable();  
    }  
}
