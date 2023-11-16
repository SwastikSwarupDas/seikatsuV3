import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uploadpropertyform',
  templateUrl: './uploadpropertyform.component.html',
  styleUrls: ['./uploadpropertyform.component.scss']
})
export class UploadpropertyformComponent {
  uploadForm!:FormGroup;
  base64Image!: string;
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();

  constructor(private router:Router,private formBuilder:FormBuilder, private apiService:ApiService,private authService:AuthService){
    this.uploadForm = this.formBuilder.group({
      images:[[],Validators.required],
      propertyName:["",Validators.required],
      locationName:["",Validators.required],
      locationDescription:["",Validators.required],
      price:["",Validators.required]
    });
  }

  onSubmit(){
    console.log(this.uploadForm.value);
    const propertyData = this.uploadForm.value;
    propertyData.images = [this.base64Image];
    this.apiService.addProperty(propertyData).subscribe({
      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.error(error);
      }
    });
    this.router.navigate(['']);
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }



}
