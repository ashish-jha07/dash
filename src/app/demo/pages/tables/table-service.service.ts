import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpEventType } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { fromEventPattern } from 'rxjs';
import {environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TableServiceService {
  title = 'angular-loader';
  fileUploadProgress: string = null;
  constructor( private http: HttpClient , public toastr: ToastrService , private router :Router) { }
  postsPerPage

  getData(postsPerPage: number) {
    const queryParams = `?pageNo=${postsPerPage}`;

    const url = environment.SERVER_URL+'/users'+ queryParams;
    return this.http.get(url).pipe(map(res => {return res; }));
  }


  delteUsers(id) {
    const url = environment.SERVER_URL+'/users/delete/' + id;
    return this.http.delete(url).pipe(map(res => {return res; }));
  }


  editUser(id){
    const url = environment.SERVER_URL+'/users/edit/' + id;
    return this.http.get(url).pipe(map(res => {return res; }));

  }


  updateUser(user , id) {
    const url =environment.SERVER_URL+'/users/update/' + id;
    console.log(id + ' table service ' + user)
    return this.http.post(url,user).pipe(map(res => {return res; }));

  }
//Global Function for image Upload 
  imageupload(fileData){
    console.log(fileData,"file   image upload call")
    const formData = new FormData();
    formData.append('files', fileData);
      
      const url = environment.SERVER_URL +'/users/fileUpload' ;
     return this.http.post(url, formData)
    };
    //   ,
    //    {
    //   reportProgress: true,
    //   observe: 'events'   
    // })
 
 


  //   public uploadImage(image: File): Observable<Object> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post('/api/v1/image-upload', formData);
  // }


  showToaster(a:string, status){
    if(status){
      this.toastr.success(a,'sucess',{
        timeOut: 3000
      })
    }
    else{
      this.toastr.info(a, 'No User deleted',{
        timeOut: 2000
      });
    }
    
      
    }




    serchData(name){
      console.log('im in service search data '+ name)
      const url = environment.SERVER_URL +'/users/Search' ;
      return this.http.post(url,name).pipe(map(res => {return res; }));
    }

}
