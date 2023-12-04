import { Component,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Properties,GeoLocation, user } from 'src/app/services/api.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {
  id:any;
  loaded:boolean=false;
  property:Properties[] =[];
  properties:Properties[]=[];
  location: GeoLocation = {
    longitude:0,
    latitude:0
  }
  
  value:number=36;
  


  loanAmount!: number; 
  tenureInMonths: number = this.value; 
  
 
  emi!: number;
   
  user: user={
    images:[],
    id: '',
    username: '',
    password: '',
    email: '',
    usertype: '',
    propertyIds: []
  };
  

  map!: google.maps.Map;
  lat:number=17.433412099500895;
  lng:number=78.38158316758812;
  @ViewChild('map') mapElement: any;

  isAuthenticated:boolean=false;

  constructor(private ar:ActivatedRoute,private api:ApiService,private apiService:ApiService)
  {
    this.id=ar.snapshot.params['id'];
    api.getAllProperties().subscribe(r=>{
      this.property=r;
      this.property=this.property.filter((i)=>{
        return i.id===this.id;
        
      })
      console.log(this.property);
      this.lat = this.property[0].geoLocation.latitude;
    this.lng = this.property[0].geoLocation.longitude;
    this.loanAmount = parseFloat(this.property[0].price);
    this.calculateEMI();
      this.loaded=true;
    })

    if(localStorage.getItem('loggedin')){
      this.isAuthenticated = true;
      // if(localStorage.getItem('loggedin')!=undefined)
      this.user = JSON.parse(localStorage.getItem('loggedin')!);
    }
    
  }

  printPage(){
    window.print();
  }

  calculateEMI(): void {
    const annualInterestRate = 0.1; // Example annual interest rate (10%)
    const monthlyInterestRate = annualInterestRate / 12; // Monthly interest rate

    const numerator = this.loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, this.tenureInMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, this.tenureInMonths) - 1;

    const emi = numerator / denominator;
    this.emi = emi;
  }

  onSliderChange(event: any): void {
    this.tenureInMonths = event.value;
    this.calculateEMI();
  }

  ngOnInit(){
    this.fetchProperties();
  }

  fetchProperties() {
    this.apiService.getAllProperties().subscribe(properties => {
      this.properties = properties;
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
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
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
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
    });

    new google.maps.Marker({
      position:{lat:this.lat,lng:this.lng},
      map:this.map,
    });


  }
}
