import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';

@NgModule({
  imports: [CommonModule],
  providers: [ConfigService],
  declarations: [],
  exports: [CommonModule]
})
export class SharedModule { }
