import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { PasswordModule } from 'primeng/password';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MapComponent } from './components/map/map.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule} from '@angular/common/http';
import { OldUserLoginComponent } from './components/old-user-login/old-user-login.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import { YourAccountComponent } from './components/your-account/your-account.component';
import { UploadpropertyformComponent } from './components/uploadpropertyform/uploadpropertyform.component';
import { DockModule } from 'primeng/dock';
import { NotifsComponent } from './components/notifs/notifs.component';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { ElitesComponent } from './components/elites/elites.component';
import { SendComponent } from './components/messaging/send/send.component';
import { ReceivedComponent } from './components/messaging/received/received.component';
import { ReportsComponent } from './components/messaging/reports/reports.component';
import { NotifSidebarComponent } from './components/notif-sidebar/notif-sidebar.component';
import { NewmsgComponent } from './components/messaging/newmsg/newmsg.component';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    NavbarComponent,
    LoginPageComponent,
    MapComponent,
    OldUserLoginComponent,
    YourAccountComponent,
    UploadpropertyformComponent,
    NotifsComponent,
    PropertyDetailsComponent,
    ElitesComponent,
    SendComponent,
    ReceivedComponent,
    ReportsComponent,
    NotifSidebarComponent,
    NewmsgComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    PasswordModule,
    ToastModule,
    SliderModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatRippleModule,
    MatChipsModule,
    MatSelectModule,
    CarouselModule,
    ReactiveFormsModule,
    BrowserModule,
    FileUploadModule,
    AppRoutingModule,
    DockModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
