import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MapComponent } from './components/map/map.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OldUserLoginComponent } from './components/old-user-login/old-user-login.component';
import { YourAccountComponent } from './components/your-account/your-account.component';
import { UploadpropertyformComponent } from './components/uploadpropertyform/uploadpropertyform.component';
import { NotifsComponent } from './components/notifs/notifs.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { ElitesComponent } from './components/elites/elites.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { SendComponent } from './components/messaging/send/send.component';
import { ReceivedComponent } from './components/messaging/received/received.component';
import { ReportsComponent } from './components/messaging/reports/reports.component';
import { Path } from 'leaflet';
import { NewmsgComponent } from './components/messaging/newmsg/newmsg.component';



const routes: Routes = [
  {
    path:"",component:HomepageComponent
  },
  {
    path:"map",component:MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"register",component:LoginPageComponent
  },
  {
    path:"login",component:OldUserLoginComponent
  },
  {
    path:"acc",component:YourAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"upload",component:UploadpropertyformComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"notifs",
    component:NotifsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"details/:id",
    component:PropertyDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"elites",
    component:ElitesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"send",
    component:SendComponent,
    // outlet:"notifoutlet"
  },
  {
    path:"receive",
    component:ReceivedComponent,
    // outlet:"notifoutlet"
  },
  {
    path:"reports",
    component:ReportsComponent,
    // outlet:"notifoutlet" 
  },
  {
    path:"newmsg",
    component:NewmsgComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
