import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: ApiService,
    private router: Router,
    private api: ApiService
  ) {}

  canActivate(): boolean {

    let user: any;
    const username = JSON.parse(localStorage.getItem('loggedin')!);

    this.api.getUserByUsername(username).subscribe((res: any) => {
        user = res;
    })

    if (user.usertype === 'seller' || user.usertype === 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}