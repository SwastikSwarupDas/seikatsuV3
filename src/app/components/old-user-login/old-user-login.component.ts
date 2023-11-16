import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  userSubscription:Subscription|undefined;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private authService : AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    console.log("inside login onsubmit");
    const enteredUsername = this.loginForm.value.username;
    console.log(enteredUsername);
    const enteredPassword = this.loginForm.value.password;
    console.log(enteredPassword);

    this.userSubscription = this.apiService.getAllUsers().subscribe((users: user[]) => {
      const user = users.find(u => u.username === enteredUsername);

      if (user && this.apiService.comparePasswords(enteredPassword, user.password)) {
        console.log('Authentication successful');
        this.authService.loginSuccess(user);
      } else {
        console.log('Authentication Failed');
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
