// import { NgModule } from '@angular/core';

import { email } from './email/validator';
import { number } from './number/validator';
import { range } from './range/validator';
import { nameString } from './nameString/validator';

export const CustomValidators: any = {
   email, number, range, nameString
}

// @NgModule({})

// export class CustomFormsModule { }