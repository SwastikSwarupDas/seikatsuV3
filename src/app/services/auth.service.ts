import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject,Observable} from 'rxjs';
import { ApiService,user } from './api.service';
import {first, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userIdSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userEmailSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userPropertyIds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  
  // private authChangedSource: Subject<void> = new Subject<void>();

  constructor(private router:Router, private apiService:ApiService) { }

  loginSuccess(user:user){
    console.log(user);
    this.isAuthenticatedSubject.next(true);
    this.usernameSubject.next(user.username);
    this.userTypeSubject.next(user.usertype);
    this.userIdSubject.next(user._id);
    this.userPropertyIds.next(user.propertyIds);
    this.router.navigate(['']);
  }

  isAuthenticatedUser(): Observable<boolean>{
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername():Observable<string>{
    return this.usernameSubject.asObservable();
  }
  
  getUserType():Observable<string>{
    return this.userTypeSubject.asObservable();
  }

  getUserId():Observable<string>{
    return this.userIdSubject.asObservable();
  }

  getUserPropertyIds():Observable<string[]>{
    return this.userPropertyIds.asObservable();
  }

  logout(){
    this.isAuthenticatedSubject.next(false);
    this.userTypeSubject.next('');
    this.usernameSubject.next('');
    this.userIdSubject.next('');
    this.router.navigate(['login'])
  }

}
