import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ApiService, Properties, user } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss']
})
export class YourAccountComponent {
  properties:Properties[]=[];
  loaded:boolean=false;
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

  constructor(private authService: AuthService, private apiService: ApiService) {
    if(localStorage.getItem('loggedin')){
      this.user = JSON.parse(localStorage.getItem('loggedin')!);
    }
  }



  ngOnInit() {
    // this.username$.subscribe(username => {
    //   console.log(username);
    //   this.apiService.getUserByUsername(username).subscribe((user:any) => {
    //     console.log(user);
    //     this.user = user;
    //     console.log(this.user);
    //   })
    // });
    
    this.fetchProperties();
  }

  fetchProperties() {
    this.apiService.getAllProperties().subscribe(properties => {
      const filteredProperties = properties.filter(property => {
        return property.userIds === this.user.username;
      });
      this.properties = filteredProperties;
      this.loaded=true;
    });
  }

}
