import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenttticationService } from '../authentttication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private authentttication: AuthenttticationService, private router: Router,private toastr: ToastrService) { }
  submitted = false;
  private sub:any = null;
  userData: any;

  ngOnInit() {
    this.angForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        
      ]),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    // this.angForm.setValue({name: 'Nancy', email: 'Drew', password: '1223'});
  }
  get f() { return this.angForm.controls; }


  onSubmit(customerData) {
       
    this.submitted = true;

  
    console.warn('Your order has been submitted reg', customerData);
    
    this.addUser();
    // this.angForm.reset();
    
  }

  addUser(){
    this.sub = this.authentttication.addUser(this.angForm.value).subscribe((data ) =>
     { 
      this.userData = data;
      
      // if(this.userData){
      //   // this.showToaster();
      //   if(this.userData.user.email)
      //   this.router.navigate(['/auth/signin'])
      // }
      // else{
        
      // }
      if(this.userData){
        if(this.userData.serverErrorDublicateEmail){
          console.log(this.userData);
          this.showToaster('email already exist', true);
        }
        else{
          this.showToaster('sucessfull register', true);
          this.router.navigate(['/auth/signin'])
        }
      }

      
     
     },(err) =>{ })
    
  }

  onReset() {
    this.submitted = false;
    this.angForm.reset();
}


ngOnDestroy() {
  if (this.sub != null) {
      this.sub.unsubscribe();
  }
}
showToaster(a:string, status){
if(status){
  this.toastr.success(a)
}
else{
  this.toastr.error(a);
}

  
}

}
