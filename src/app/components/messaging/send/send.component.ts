import { Component } from '@angular/core';
import { ApiService, Notifs, user } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
 
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
  constructor(private apiService:ApiService, private authService:AuthService){

    if(localStorage.getItem('loggedin')){
      this.user = JSON.parse(localStorage.getItem('loggedin')!);
  }

}

  ngOnInit(){
    this.fetchNotifications();
  }

  fetchNotifications(){
    this.apiService.getAllNotifs().subscribe(notifications =>{
      const filteredNotifications = notifications.filter(notification =>{
        return notification.senderName === this.user.username;
      });
      this.notifs = filteredNotifications;
    })
  }

  delete(id:string){
    this.apiService.deleteMessage(id).subscribe({
      next:Response=>{
        console.log(Response);
        this.fetchNotifications();
      },
      error:error=>{
        // console.error(error);
        this.fetchNotifications();
      }
      
    })
  }

}
