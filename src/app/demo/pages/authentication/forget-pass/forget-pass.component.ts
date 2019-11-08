import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenttticationService } from '../authentttication.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

angForm: FormGroup;
  private sub:any = null;
  userData : any;
  constructor(private fb: FormBuilder, private authentttication : AuthenttticationService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
  
    this.angForm = new FormGroup({
      
      'email': new FormControl('',[Validators.required,Validators.email]),
    });
    
  }

  onSubmit(customerData) {
    
   
    console.warn('user submitted req for login ', customerData);
    this.forgetPass();
    this.angForm.reset();
  }

  forgetPass(){
    this.sub=  this.authentttication.forgetPass(this.angForm.value).subscribe((data:any) =>{ 
      this.userData = data;
      console.log(this.userData)
      if(this.userData){
        if(this.userData.err){
          // console.log(this.userData);
          this.showToaster('email not found', false);
        }
        else{
          //  localStorage.setItem('userLogedIn', this.userData.token);
          this.showToaster('Go to your gmail', true);
          
          // this.router.navigate(['/auth/resetPasword/:id'])
        }
      }

   
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
