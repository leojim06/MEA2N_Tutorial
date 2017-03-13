import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfigService, ApiService, JwtService, } from './services';
import { TrimValueAccessorDirective } from './directives';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    ConfigService,
    ApiService,
    JwtService
  ],
  declarations: [
    TrimValueAccessorDirective
  ],
  exports: [
    CommonModule,
    TrimValueAccessorDirective
  ]
})
export class SharedModule { }
