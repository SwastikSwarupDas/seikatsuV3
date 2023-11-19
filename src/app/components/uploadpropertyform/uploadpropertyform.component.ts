import { Component,ViewChild,Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { ApiService, GeoLocation, Properties, user } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { mapsMouseEvent } from 'googlemaps';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-uploadpropertyform',
  templateUrl: './uploadpropertyform.component.html',
  styleUrls: ['./uploadpropertyform.component.scss']
})
export class UploadpropertyformComponent {


  location: GeoLocation = {
    longitude:0,
    latitude:0
  }

  map!: google.maps.Map;
  beachMarker!:google.maps.Marker;
  image:string = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  lat:number=17.433412099500895;
  lng:number=78.38158316758812;
  
  @ViewChild('map') mapElement: any;

  uploadForm!:FormGroup;
  base64Image!: string;
  user: user={
    _id: '',
    username: '',
    password: '',
    email: '',
    usertype: '',
    propertyIds: []
  };

  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticatedUser();

  constructor(private router:Router,private formBuilder:FormBuilder, private apiService:ApiService,private authService:AuthService){
    this.uploadForm = this.formBuilder.group({
      images:[[],Validators.required],
      propertyName:["",Validators.required],
      locationName:["",Validators.required],
      locationDescription:["",Validators.required],
      sku:["",Validators.required],
      price:["",Validators.required]
    });
  }

  username$: Observable<string> = this.authService.getUsername();

  ngOnInit(){

    this.username$.subscribe(username => {
      console.log(username);
      this.apiService.getUserByUsername(username).subscribe((user:any) => {
        console.log(user);
        this.user = user;
        console.log(this.user);
      })
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
 

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: mapProperties.center,
  });

  this.map.addListener("click", (mapsMouseEvent) => {
    if (this.beachMarker) this.beachMarker.setMap(null);
    this.lat = mapsMouseEvent.latLng.lat();
    this.lng = mapsMouseEvent.latLng.lng();
    console.log(this.lat,this.lng);
    this.beachMarker = new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng},
      map: this.map,
      draggable:true
      })
   });
 
   this.location = {
    latitude: this.lat,
    longitude: this.lng
  };

}

  onSubmit(){
    console.log("Inside onSubmit of Upload");
    
    console.log(this.user);
    
    console.log(this.uploadForm.value);
    const propertyData : Properties = this.uploadForm.value;
    propertyData.userIds=this.user.username;
    propertyData.images = [this.base64Image];
    propertyData.geoLocation = this.location;

    this.apiService.appendPropertyDataintoUser(this.user.username, propertyData).subscribe({
      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.error(error);
      }
    })



    this.apiService.addProperty(propertyData).subscribe({
      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.error(error);
      }
    });
    this.router.navigate(['']);
  }



  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }



}
