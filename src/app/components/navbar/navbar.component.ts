import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ApiService, Notifs, user } from 'src/app/services/api.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();
  username$: Observable<string> = this.authService.getUsername();
  userType$: Observable<string> = this.authService.getUserType();

  user: user={
    images:[],
    id: '',
    username: '',
    password: '',
    email: '',
    usertype: '',
    propertyIds: []
  };

  notifs : Notifs[] = [];

  isAuthenticated: boolean = false;
  
  constructor(private authService:AuthService, private apiService:ApiService){
    if(localStorage.getItem('loggedin')){
      this.isAuthenticated = true;
      // if(localStorage.getItem('loggedin')!=undefined)
      this.user = JSON.parse(localStorage.getItem('loggedin')!);
    }
  }

  ngOnInit(){
    // this.isAuthenticated = localStorage.getItem('loggedin');
    this.fetchNotifications();
  }

  fetchNotifications(){
    this.apiService.getAllNotifs().subscribe(notifications =>{
      this.notifs = notifications;
    })
  }

  logout(){
    this.authService.logout();
    localStorage.removeItem('loggedin');
  }
}
