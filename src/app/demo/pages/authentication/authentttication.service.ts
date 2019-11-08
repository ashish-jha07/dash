import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenttticationService {

  constructor(private http: HttpClient) { }

  addUser(data: any){
    return this.http.post('http://localhost:3000/users/add' , data);
  }

  loginUser(data : any){
    console.log('login function call')
    return this.http.post('http://localhost:3000/users/login' , data);
  }


  forgetPass(data : any){
    // console.log('forget pass' + data.email)
     return this.http.post('http://localhost:3000/users/forget-pass',data);
   }

   resetPassword(data: String, token){
    // console.log(token + ' in reset password');
    return this.http.post('http://localhost:3000/users/reset-pass',{data, token})
  }













  getToken() {
    return localStorage.getItem('userLogedIn');
  }
   
  deleteToken() {
    localStorage.removeItem('userLogedIn');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      console.log(' get user playload ' +                     token )
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
 
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    console.log( JSON.stringify(userPayload) + 'user data') 
    if (userPayload)
      return true;
    else
      return false;
  }

}
