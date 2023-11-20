import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, GeoLocation, Properties } from 'src/app/services/api.service';
import {} from 'googlemaps';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  location: GeoLocation = {
    longitude:0,
    latitude:0
  }

  @ViewChild('map') mapElement: any;

  map!: google.maps.Map;
  beachMarker!:google.maps.Marker;
  image:string = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  lat:number=17.433412099500895;
  lng:number=78.38158316758812;
  


  loaded:boolean=false;
  fg:FormGroup;
  properties: Properties[] = [];
  filteredProperties: Properties[] = [];
  constructor(private apiService: ApiService,fb:FormBuilder,private router:Router) {
    this.fg=fb.group({
      fc:''
    })
  }

  ngOnInit() {
    this.fetchProperties();
    this.fg.get('fc')?.valueChanges.subscribe(() => {
      this.search();
  });

  }


  ngAfterViewInit(){
    const mapProperties = {
      center: new google.maps.LatLng(this.lat,this.lng ),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    }
  
    this.map = new google.maps.Map(this.mapElement.nativeElement,{
      center: { lat: this.lat, lng: this.lng },
    zoom: 12,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#15ac7f" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#61ab79" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#83d49d" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#84e0b1" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#84e0b1" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#84e0b1" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#15ac7f" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#84e0b1" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ffffff" }],
      },
    ],
    });
  }

  fetchProperties() {
    this.apiService.getAllProperties().subscribe(properties => {
      this.properties = properties;
      this.filteredProperties=properties;
      this.loaded=true;
      console.log(properties);
      
    });
  }
  search(){
    let searchQuery=this.fg.get('fc')?.value.toLowerCase();
    this.filteredProperties=this.properties.filter((i)=>{
      return i.propertyName.toLowerCase().includes(searchQuery);
    })
  }
  sortPropertiesByPriceAsc() {
    this.filteredProperties.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceA - priceB;
    });
}
sortPropertiesByPriceDesc(){
  this.filteredProperties.sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return priceB - priceA;
});
}

propertyClick(){
  this.router.navigate(['/details']);
}
}
