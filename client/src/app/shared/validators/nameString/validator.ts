import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { isPresent } from '../facade/lang';

export const nameString: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
   if (isPresent(Validators.required(control))) return null;

   let v: string = control.value;
   const stringRegExp = /^[a-zA-Z\u00C0-\u00ff \']+$/;
   return stringRegExp.test(v) ? null : { 'nameString': true };
}