import { Component } from '@angular/core';
import { ApiService, Properties } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  loaded:boolean=false;

  properties: Properties[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    
    let loggedIn = localStorage.getItem('loggedin');
    if (!loggedIn) 
      { 
        loggedIn = 'guest'; 
        localStorage.setItem('loggedin', loggedIn); 
      }

    this.fetchProperties();

  }

  fetchProperties() {
    this.apiService.getAllProperties().subscribe(properties => {
      this.properties = properties;
      this.loaded=true;
    });
  }
}
