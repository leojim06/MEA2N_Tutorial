import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { WelcomeModule } from './welcome';
import { ConfesionModule } from './confesion';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    WelcomeModule,
    ConfesionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
