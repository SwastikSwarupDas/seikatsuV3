import { Component } from '@angular/core';
import { ApiService, Properties } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  properties: Properties[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchProperties();
  }

  fetchProperties() {
    this.apiService.getAllProperties().subscribe(properties => {
      this.properties = properties;
    });
  }
}
