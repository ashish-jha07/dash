import { Injectable } from "@angular/core";
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import {
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { LoaderService } from  './../loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    requestCount = 0;

    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestCount++;
        this.loaderService.show();
        return next.handle(req).pipe(
        finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
        this.loaderService.hide();
        }
        })
        );
    }
}
    // private requests: HttpRequest<any>[] = [];
 
    // constructor(private loaderService: LoaderService) { }
 
    // removeRequest(req: HttpRequest<any>) {
    //     const i = this.requests.indexOf(req);
    //     if (i >= 0) {
    //         this.requests.splice(i, 1);
    //     }
    //     this.loaderService.isLoading.next(this.requests.length > 0);
    // }
 
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    //     this.requests.push(req);
    //     console.log("No of requests--->" + this.requests.length);
    //     this.loaderService.isLoading.next(true);
    //     return Observable.create(observer => {
    //         const subscription = next.handle(req)
    //             .subscribe(
    //                 event => {
    //                     if (event instanceof HttpResponse) {
    //                         this.removeRequest(req);
    //                         observer.next(event);
    //                     }
    //                 },
    //                 err => {
    //                     alert('error returned');
    //                     this.removeRequest(req);
    //                     observer.error(err);
    //                 },
    //                 () => {
    //                     this.removeRequest(req);
    //                     observer.complete();
    //                 });
    //         // remove request from queue when cancelled
    //         return () => {
    //             this.removeRequest(req);
    //             subscription.unsubscribe();
    //         };
    //     });
    // }

