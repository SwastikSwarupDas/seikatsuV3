import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  base64Image!: string;
  loginForm!:FormGroup;
  failed:boolean=false; 
  loaded:boolean=false;
  imgUrl:string="https://picsum.photos/2000/?blur=10";

  constructor(private formBuilder:FormBuilder, private apiService:ApiService){
    this.loginForm = this.formBuilder.group({
      images:[[],Validators.required],
      username:["",Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]],
      email:['',[Validators.required,Validators.email]],
      usertype:['',Validators.required]
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    const userData = this.loginForm.value;
    userData.images = [this.base64Image];
    this.apiService.addUser(userData).subscribe({
      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.error(error);
        this.failed = false;
        this.loginForm.reset();
        this.removeUploadedFile(0);
      }
    });
  
    
  }

  ngOnInit(){
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
  }

  uploadedFiles: File[] = [];

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
        this.uploadedFiles.push(file);
      };
      reader.readAsDataURL(file);
    }
  }

  removeUploadedFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

}
