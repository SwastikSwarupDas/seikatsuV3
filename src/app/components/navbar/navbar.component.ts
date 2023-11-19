import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ApiService, Notifs } from 'src/app/services/api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();
  username$: Observable<string> = this.authService.getUsername();
  userType$: Observable<string> = this.authService.getUserType();

  notifs : Notifs[] = [];
  
  constructor(private authService:AuthService, private apiService:ApiService){

  }

  ngOnInit(){
    this.fetchNotifications();
  }

  fetchNotifications(){
    this.apiService.getAllNotifs().subscribe(notifications =>{
      this.notifs = notifications;
    })
  }

  logout(){
    this.authService.logout();
  }
}
