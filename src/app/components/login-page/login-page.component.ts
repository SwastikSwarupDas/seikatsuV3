import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private apiService:ApiService){
    this.loginForm = this.formBuilder.group({
      username:["",Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]],
      email:['',[Validators.required,Validators.email]],
      usertype:['',Validators.required]
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    const userData = this.loginForm.value;
    this.apiService.addUser(userData).subscribe({
      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.error(error);
      }
    });
  
    
  }

}
