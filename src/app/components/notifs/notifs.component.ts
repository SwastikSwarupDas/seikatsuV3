import { Component } from '@angular/core';
import { ApiService, Notifs, user } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifs',
  templateUrl: './notifs.component.html',
  styleUrls: ['./notifs.component.scss']
})
export class NotifsComponent {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();

  notifs : Notifs[] = [];
  constructor(private apiService:ApiService, private authService:AuthService){}
  username$: Observable<string> = this.authService.getUsername();
  user: user={
    _id: '',
    username: '',
    password: '',
    email: '',
    usertype: '',
    propertyIds: []
  };

  ngOnInit(){

    this.username$.subscribe(username => {
      console.log(username);
      this.apiService.getUserByUsername(username).subscribe((user:any) => {
        console.log(user);
        this.user = user;
        console.log(this.user);
      })
    });

    this.fetchNotifications();
  }

  fetchNotifications(){
    this.apiService.getAllNotifs().subscribe(notifications =>{
      const filteredNotifications = notifications.filter(notification =>{
        return notification.receiverName === this.user.username;
      });
      this.notifs = filteredNotifications;

    })
  }

}
