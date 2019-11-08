import { Component, OnInit } from '@angular/core';
import {TableServiceService} from '../table-service.service';
import { Router,ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpEventType} from '@angular/common/http';
import {environment} from '../../../../../environments/environment'
// import {TableServiceService} from './../table-service.service'
import { Spinkit } from 'ng-http-loader'; // <============
import {LoaderService} from '../../../../theme/shared/components/loader.service'
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-edit-user-detail',
  templateUrl: './edit-user-detail.component.html',
  styleUrls: ['./edit-user-detail.component.scss']
})
export class EditUserDetailComponent implements OnInit {
  user:any;
  filePath : any = '';
  angForm: FormGroup;
  selectedFile: ImageSnippet;
  a: any;
  fileData: File = null;
previewUrl:any = null;
  imageUploadData: any;
  imagePAth: any ={};
  // public spinkit = Spinkit; // <============
  // isloading = false;
  constructor(private http: HttpClient,private toastr: ToastrService,private fb: FormBuilder,private loaderService : LoaderService,private tableServiceService: TableServiceService, private route: ActivatedRoute , private router : Router) { }
  
    setValue() { this.angForm.setValue({name: this.user.name, email: this.user.email, imagePath: this.imagePAth }); }

  
  ngOnInit(){



    this.angForm = new FormGroup({
      
      'name': new FormControl('',[Validators.required,]),
      'email': new FormControl('', [Validators.required,Validators.email]),
      'imagePath' : new FormControl('')
    });
    // this.loaderService.isLoading = true;
  // this.loaderService.show();
    // this.isloading = true;
    this.editUser();
    // this.router.navigate="([/tables/bootstrap])"
  
    // this.tableServiceService.editUser(console.log(this.route.params.subscribe(parms => parms['id']))).subscribe(data => {
    //   this.user= data;
    //   console.log(this.user);
    // })
}
editUser(){
  this.route.params.subscribe(params => {
    // this.loaderService.show()
    this.tableServiceService.editUser(params['id']).subscribe(res => { 

      this.user = res;
      
      // this.loaderService.hide();
      console.log(this.user)
      // console.log(this.user.imagePath.filePath + ' edituser ')
      // // this.loaderService.isLoading
      // let filename = this.user.imagePath.fileName;
         this.filePath =   environment.SERVER_URL   +'/'+ this.user.imagePath;
      // console.log( this.filePath)
      this.setValue()
    });
  });
}

updateUser(user){
  console.log('form value')
  console.log(user  )
  console.log('file data')
  console.log(this.fileData)
  // this.tableServiceService.updateUser(user).subscribe( data => { if(data) { console.log(data), this.router.navigate['/tables/bootstrap']}});
  
  this.route.params.subscribe(params => {

  if(this.fileData){
    this.tableServiceService.imageupload(this.fileData).subscribe(data => 
      { this.imageUploadData = data;
        console.log("image upload data ");
        console.log(data);
        this.imagePAth =this.imageUploadData.data.filePath;
         this.angForm.patchValue({imagePath: this.imageUploadData.data.filePath})    ;
      
         console.log(' update user form value ')
         console.log(this.angForm.value)  ;
         this.tableServiceService.updateUser( this.angForm.value, params['id']).subscribe(data => 
           {
           this.a = data;
           if(this.a.userupdated){
             console.log( this.a.userupdated)
             this.impageUpload(this.fileData);
            this.showToaster('User Updated', true);
         
           
               this.router.navigate(['/User/userDefaul']);
         
           }
           });
        }
  
      ) 
      }else {
        // console.log(this.user.filePath)
        this.angForm.patchValue({imagePath: this.user.imagePath})    ;
       
        console.log(this.angForm.value)
        this.tableServiceService.updateUser( this.angForm.value, params['id']).subscribe(data => 
          {
          this.a = data;
          if(this.a.userupdated){
            console.log( this.a.userupdated)
            this.impageUpload(this.fileData);
           this.showToaster('User Updated', true);
        
          
              this.router.navigate(['/User/userDefaul']);
        
          }
          });
      }
      
    // this.tableServiceService.imageupload(fileData).subscribe(fileData =>{
      // user.imagePath = fileData.data;
    
  
    });
   
    
  
    
  };

  
  

// private onSuccess() {
//   this.selectedFile.pending = false;
//   this.selectedFile.status = 'ok';
// }

// private onError() {
//   this.selectedFile.pending = false;
//   this.selectedFile.status = 'fail';
//   this.selectedFile.src = '';
// }

// processFile(imageInput: any) {
//   const file: File = imageInput.files[0];
//   const reader = new FileReader();

//   reader.addEventListener('load', (event: any) => {

//     this.selectedFile = new ImageSnippet(event.target.result, file);

//     this.selectedFile.pending = true;
//     this.tableServiceService.uploadImage(this.selectedFile.file).subscribe(
//       (res) => {
//         this.onSuccess();
//       },
//       (err) => {
//         this.onError();
//       })
//   });

//   reader.readAsDataURL(file);
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











uploadedFilePath: string = null;
// constructor(private http: HttpClient) { }
 
fileProgress(fileInput: any) {
  console.log(File)
      this.fileData = <File>fileInput.target.files[0];
      console.log('file data')
      console.log(this.fileData)
      this.preview();
}
 
preview() {
    // Show preview 
    console.log('file data type')
    console.log(this.fileData.type)
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return false;
    }
 
    var reader = new FileReader(); 
       
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      console.log(_event)
      this.previewUrl = reader.result; 
    }
}
 
onSubmit() {
  // const formData = new FormData();
  // formData.append('files', this.fileData);
  
   console.log()
  
 
}



impageUpload(fileData){
  this.route.params.subscribe(params => {
    this.tableServiceService.imageupload(fileData);

    
  })
}
}
  
  //here come data(id) from table bootstrap based upon id we fatch dta 
  


