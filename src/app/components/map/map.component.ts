import { AfterViewInit, Component,OnInit,ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;
  beachMarker!:google.maps.Marker;
  image:string = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  ngAfterViewInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(17.433412099500895, 78.38158316758812),
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
    this.beachMarker = new google.maps.Marker({
      position: { lat: 17.433412099500895, lng: 78.38158316758812},
      map: this.map,
      icon: this.image,
    })
 }
 
}
