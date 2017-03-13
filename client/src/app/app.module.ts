import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { WelcomeModule } from './welcome';
import { ConfesionModule } from './confesion';
import { PropietariosModule } from './propietarios';
import { FincasModule } from './fincas';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
    BootstrapModalModule,
    BrowserModule,
    // ReactiveFormsModule,
    HttpModule,
    WelcomeModule,
    ConfesionModule,
    PropietariosModule,
    FincasModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
