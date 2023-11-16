import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ApiService, user } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss']
})
export class YourAccountComponent {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();
  username$: Observable<string> = this.authService.getUsername();
  userType$: Observable<string> = this.authService.getUserType();

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
  }
}
