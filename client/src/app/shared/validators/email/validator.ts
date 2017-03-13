import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { isPresent } from '../facade/lang';

export const email: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
   if (isPresent(Validators.required(control))) return null;

   let v: string = control.value;
   const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return emailRegExp.test(v) ? null : { 'email': true };
}