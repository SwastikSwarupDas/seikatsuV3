import { Component,ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { ApiService, Properties, user } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { mapsMouseEvent } from 'googlemaps';



@Component({
  selector: 'app-uploadpropertyform',
  templateUrl: './uploadpropertyform.component.html',
  styleUrls: ['./uploadpropertyform.component.scss']
})
export class UploadpropertyformComponent {

  map!: google.maps.Map;
  beachMarker!:google.maps.Marker;
  image:string = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  @ViewChild('map') mapElement: any;

  svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

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
      center: new google.maps.LatLng(17.433412099500895, 78.38158316758812),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   
    };
  
    this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
    this.beachMarker = new google.maps.Marker({
    position: { lat: 17.433412099500895, lng: 78.38158316758812},
    map: this.map,
    icon: this.svgMarker,
  
  })

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: mapProperties.center,
  });

  infoWindow.open(this.map);

  this.map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
    );
    infoWindow.open(this.map);
  });
}







  onSubmit(){
    console.log("Inside onSubmit of Upload");
    
    console.log(this.user);
    
    console.log(this.uploadForm.value);
    const propertyData : Properties = this.uploadForm.value;
    propertyData.userIds=this.user.username;
    propertyData.images = [this.base64Image];
    
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
