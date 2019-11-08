import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenttticationService} from './../../../../../app/demo/pages/authentication/authentttication.service'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenttticationService : AuthenttticationService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenttticationService.getToken(); 
    console.log('auth interceptor call')
    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log(req1.headers)
    // console.log(token)
    return next.handle(req1);
  }

}



// import {
//     HttpInterceptor,
//     HttpRequest,
//     HttpHandler
//   } from "@angular/common/http";
//   import { Injectable } from "@angular/core";
  
//   import { AuthService } from "./auth.service";
  
//   @Injectable()
//   export class AuthInterceptor implements HttpInterceptor {
//     constructor(private authService: AuthService) {}
  
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//       const authToken = this.authService.getToken();
//       const authRequest = req.clone({
//         headers: req.headers.set("Authorization", "Bearer " + authToken)
//       });
//       return next.handle(authRequest);
//     }
//   }