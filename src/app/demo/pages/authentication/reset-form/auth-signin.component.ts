import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenttticationService } from '../authentttication.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private authentttication : AuthenttticationService, private router: Router) { }

  ngOnInit() {
    console.log('heheh')
    this.angForm = new FormGroup({
      
      'email': new FormControl('',[Validators.required,]),
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
    this.authentttication.loginUser(this.angForm.value).subscribe((data:any) =>{ 

     localStorage.setItem('userLogedIn', data.token);
      if(data.token == undefined || null){

      }
      else{
        this.router.navigateByUrl('/dashboard/default');
      }
    console.log(JSON.stringify(data.token + ''+ data))
  }
    )
  
  }
}
