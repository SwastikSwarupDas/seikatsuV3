import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordHashService } from './password-hash.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export interface Notifs{
  _id :  string;
senderName : string;
receiverName : string;
flaggedUser	: string;
flag : string;
message	: string;
messageType	:string;
time:string;
}

export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


export interface user {
  _id: string;
  username: string;
  password: string;
  email: string;
  usertype: string;
  propertyIds: string[];
}

export interface Properties {
  id: string; // replace 'any' with the actual type
  images: string[]; // replace 'any' with the actual type
  locationName: string;
  locationDescription: string;
  propertyName: string;
  price:string;
  sku:string;
  userIds:string;
  geoLocation: GeoLocation; // assuming GeoLocation is another interface
}

export interface GeoLocation{
  longitude:number;
  latitude:number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user$!:Observable<user[]>;
  singleuser$!:Observable<user[]>;
  properties$!:Observable<Properties[]>;
  notifs$!:Observable<Notifs[]>;
  
  password        : string='';
  hashedPassword  : string='';

  constructor(private database : HttpClient, private passwordHashService: PasswordHashService) { }

  addUser(userdata:any){
      const hashedPassword = this.passwordHashService.hashPassword(userdata.password);
      userdata.password=hashedPassword;

      return this.database.post('https://localhost:7122/api/Users', userdata);
  }

  addProperty(propertyData:Properties){
    return this.database.post<Properties>('https://localhost:7122/api/Properties',propertyData)
  }

  appendPropertyDataintoUser(username: string, propertyData: Properties): Observable<any> {
    const userData = { propertyIds: [propertyData.sku] };
    return this.database.patch<user[]>(`https://localhost:7122/api/Users/addproperty?username=${username}`, userData);
  }


  getAllUsers():Observable<user[]>{
    this.user$ = this.database.get<user[]>('https://localhost:7122/api/Users');
    return this.user$;
  }

  getAllProperties():Observable<Properties[]>{
    this.properties$ = this.database.get<Properties[]>('https://localhost:7122/api/Properties');
    return this.properties$;
  }

  getAllNotifs():Observable<Notifs[]>{
    this.notifs$ = this.database.get<Notifs[]>('https://localhost:7122/api/Notif');
    return this.notifs$;
  }

 

  getUserByUsername(username:string):Observable<user[]>{
    return this.database.get<user[]>('https://localhost:7122/api/Users/'+username);
  }

  comparePasswords(enteredPassword:string,hashedPassword:string):boolean{
    const hashedEnteredPassword = this.passwordHashService.hashPassword(enteredPassword);
    return hashedEnteredPassword === hashedPassword;
  }

  

}
