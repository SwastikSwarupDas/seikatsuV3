import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();
  username$: Observable<string> = this.authService.getUsername();
  userType$: Observable<string> = this.authService.getUserType();
  
  constructor(private authService:AuthService){

  }

  logout(){
    this.authService.logout();
  }
}
