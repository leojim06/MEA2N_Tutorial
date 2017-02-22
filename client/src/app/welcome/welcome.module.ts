import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeService } from './shared';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WelcomeComponent],
  providers: [WelcomeService],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
