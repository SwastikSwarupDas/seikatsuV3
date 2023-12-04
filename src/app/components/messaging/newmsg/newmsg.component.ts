import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, message, user } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newmsg',
  templateUrl: './newmsg.component.html',
  styleUrls: ['./newmsg.component.scss']
})
export class NewmsgComponent {

  uploadForm!:FormGroup;
  user: user={
    images:[],
    id: '',
    username: '',
    password: '',
    email: '',
    usertype: '',
    propertyIds: []
  };

  message:message={
    id: '',
    senderName: '',
    receiverName: '',
    flaggedUser: '',
    flag: '',
    message: '',
    messageType: '',
    time: ''
  };

  constructor(private router:Router,private formBuilder:FormBuilder, private apiService:ApiService,private authService:AuthService){

    if(localStorage.getItem('loggedin')){
      this.user = JSON.parse(localStorage.getItem('loggedin')!);
  }

    this.uploadForm = this.formBuilder.group({
      receiverName:["",Validators.required],
      message:["",Validators.required],
      messageType:["general",Validators.required],
      time:["",Validators.required]
    });
  }

  ngOnInit(){



    const currentDate = new Date();
    const formattedDate = new DatePipe('en-US').transform(currentDate, 'MM/dd/yyyy HH:mm:ss');
    this.uploadForm.get('time')?.setValue(formattedDate);
  }


  onSubmit(){
    const messageData : message = this.uploadForm.value;
    messageData.senderName = this.user.username;


    this.apiService.sendMessage(messageData).subscribe(
      {
        next:response=>{
          console.log(response);
          this.router.navigate(['send']);
        },
        error:error=>{
          console.error(error);
        }
      }
    )
  }

}
