import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenttticationService } from '../authentttication.service';
import { ToastrService } from 'ngx-toastr';

// import {validators} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class ResetFormComponent implements OnInit {


  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }


  angForm : FormGroup;
  public id: string;
  userData: any;
  constructor(private route: ActivatedRoute,private authentttication : AuthenttticationService, private router : Router,private toastr: ToastrService) { }
  
  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('id'); 
    console.log(this.id)
    this.angForm = new FormGroup({
      
        'password': new FormControl('',[Validators.required,]),
        'confirmPassword': new FormControl('', Validators.required)
      },{validators: this.checkPasswords });
    
  }


  onSubmit(data){
console.log(data.password)
this.authentttication.resetPassword(data, this.id).subscribe(data => 
  {
    this.userData = data;
    if(this.userData){
      if(this.userData.err){
        this.showToaster(this.userData.err, false);

      }else{
        this.showToaster(this.userData, true);

    this.router.navigate(['auth/signin']),
    console.log(this.userData)
    } }
  } );

  }





  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassword').value;

  return pass === confirmPass ? null : { notSame: true }     
}









showToaster(a:any, status){
  if(status){
    this.toastr.success(a,'Email Found',{
      timeOut: 3000
    })
  }
  else{
    this.toastr.error(a, 'Major Error',{
      timeOut: 2000
    });
  }
  
    
  }
}
