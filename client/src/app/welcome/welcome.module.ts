import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeService } from './shared';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ],
  declarations: [WelcomeComponent],
  providers: [WelcomeService]
})
export class WelcomeModule { }
