import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, user } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-old-user-login',
  templateUrl: './old-user-login.component.html',
  styleUrls: ['./old-user-login.component.scss']
})
export class OldUserLoginComponent {
  loginForm!: FormGroup;
  userData: user[] = [];
  failed:boolean=false; 
  loaded:boolean=false;
  user: user={
    images:[],
    id: '',
    username: '',
    password: '',
    email: '',
    usertype: '',
    propertyIds: []
  };

  userSubscription:Subscription|undefined;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private authService : AuthService, private router:Router) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(){
    setTimeout(() => {
      this.loaded = true;
    }, 3000);

  }

  onSubmit() {
    console.log("inside login onsubmit");

    this.apiService.userLogin(this.loginForm.value).subscribe((user:user)=>{
      
      this.user=user;
      localStorage.setItem('loggedin', JSON.stringify(user));
      console.log('Login success');
      this.router.navigate(['']); 
    },
    (error) => {
      console.error(error);
      this.loginForm.reset(); // Reset the form
    }
    );

    // this.userSubscription = this.apiService.getAllUsers().subscribe((users: user[]) => {
    //   const user = users.find(u => u.username === enteredUsername);

      
    //   localStorage.setItem('loggedin', JSON.stringify(user));


    //   if (user && this.apiService.comparePasswords(enteredPassword, user.password)) {
    //     console.log('Authentication successful');
    //     // localStorage.setItem('loggedin', enteredUsername  );
    //     this.authService.loginSuccess(user);
    //   } else {
    //     console.log('Authentication Failed');
    //   }
    // }, (error: any) => {
    //   console.error(error);
    // });
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
