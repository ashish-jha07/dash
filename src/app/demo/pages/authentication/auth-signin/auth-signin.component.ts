import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenttticationService } from '../authentttication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  angForm: FormGroup;
  private sub:any = null;
  userData : any;
  constructor(private fb: FormBuilder, private authentttication : AuthenttticationService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    console.log('heheh')
    this.angForm = new FormGroup({
      
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('', Validators.required)
    });
    // this.angForm.setValue({name: 'Nancy', email: 'Drew', password: '1223'});
  }

  onSubmit(customerData) {
    
   
    console.warn('user submitted req for login ', customerData);
    this.loginform();
    this.angForm.reset();
  }

  loginform(){
    this.sub=  this.authentttication.loginUser(this.angForm.value).subscribe((data:any) =>{ 
      this.userData = data;
      if(this.userData){
        if(this.userData.err){
          console.log(this.userData);
          this.showToaster('email password not match', false);
        }
        else{
           localStorage.setItem('userLogedIn', this.userData.token);
          this.showToaster('sucessfull Login', true);
          
          this.router.navigate(['dashboard/default'])
        }
      }

    //  localStorage.setItem('userLogedIn', data.token);
    //   if(data.token == undefined || null){

    //   }
    //   else{
    //     this.router.navigateByUrl('/dashboard/default');
    //   }
    // console.log(JSON.stringify(data.token + ''+ data))
  }
    )
  
  }


  ngOnDestroy() {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
  }

  showToaster(a:string, status){
    if(status){
      this.toastr.success(a,'sucess',{
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
