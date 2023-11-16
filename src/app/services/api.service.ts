import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordHashService } from './password-hash.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export interface user {
  _id: string;
  username: string;
  password: string;
  email: string;
  usertype: string;
  propertyIds: string[];
}

export interface Properties {
  _id: string; // replace 'any' with the actual type
  images: string[]; // replace 'any' with the actual type
  locationName: string;
  locationDescription: string;
  propertyName: string;
  price:string;
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
  properties$!:Observable<Properties[]>;

  password        : string='';
  hashedPassword  : string='';

  constructor(private database : HttpClient, private passwordHashService: PasswordHashService) { }

  addUser(userdata:any){
      const hashedPassword = this.passwordHashService.hashPassword(userdata.password);
      userdata.password=hashedPassword;

      return this.database.post('https://localhost:7122/api/Users', userdata);
  }

  addProperty(propertyData:Properties):Observable<string>{
    return this.database.post<Properties>('https://localhost:7122/api/Properties',propertyData)
    .pipe(
      map(response => response._id)
    );
  }


  getAllUsers():Observable<user[]>{
    this.user$ = this.database.get<user[]>('https://localhost:7122/api/Users');
    return this.user$;
  }

  getAllProperties():Observable<Properties[]>{
    this.properties$ = this.database.get<Properties[]>('https://localhost:7122/api/Properties');
    return this.properties$;
  }

  comparePasswords(enteredPassword:string,hashedPassword:string):boolean{
    const hashedEnteredPassword = this.passwordHashService.hashPassword(enteredPassword);
    return hashedEnteredPassword === hashedPassword;
  }

}
