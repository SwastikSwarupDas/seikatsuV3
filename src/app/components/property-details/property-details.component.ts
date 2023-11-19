import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Properties } from 'src/app/services/api.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {
  id:any;
  property:Array<Properties> =[];
  constructor(private ar:ActivatedRoute,private api:ApiService)
  {
    this.id=ar.snapshot.params['id'];
    api.getAllProperties().subscribe(r=>{
      this.property=r;
      this.property=this.property.filter((i)=>{
        return i.id===this.id;
        
      })
      console.log(this.property);
    })
    
    
    
  }
}
