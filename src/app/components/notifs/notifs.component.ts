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


}
