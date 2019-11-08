import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import {AuthenttticationService } from './demo/pages/authentication/authentttication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {



  constructor(private authenttticationService : AuthenttticationService,private router : Router){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authenttticationService.isLoggedIn()) {
        this.router.navigateByUrl('auth/signin');
        console.log('can activate calll')
        this.authenttticationService.deleteToken();
        return false;
      }
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    return true;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authenttticationService.isLoggedIn()) {
        this.router.navigateByUrl('dashboard/default');
        console.log('can activate calll')
        
        return false;
      }
    return true;
  
  }
}
