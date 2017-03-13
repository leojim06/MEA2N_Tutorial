import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Finca } from '../';
import { CustomValidators } from '../../../shared/validators';

@Injectable()
export class FincasFormService {
   private formError: { [id: string]: string };
   private validationMessage: { [id: string]: { [id: string]: string } };
   private finca: Finca;

   constructor(private fb: FormBuilder) {
      this.formError = {
         'name': '',
         'area': '',
         'latitude': '',
         'longitude': ''
      }

      this.validationMessage = {
         'name': {
            'required': 'El nombre de la finca es requerido',
            'minlength': 'El nombre no puede tener menos de 3 caracteres',
            'maxlength': 'El nombre no puede tener más de 50 caracteres'
         },
         'area': {
            'required': 'El área de la finca es requerido',
            'number': 'El área debe estar expresada en un número válido',
            'range': 'El área debe estar en el rango de 1 a 10.000 Hectareas'
         },
         'latitude': {
            'required': 'La latitud de la ubicación es requerida',
            'number': 'La latitud debe ser un número válido'
         },
         'longitude': {
            'required': 'La longitud de la ubicación es requerida',
            'number': 'La longitud debe ser un número válido'
         }
      }
   }

   public initForm(finca?: Finca): FormGroup {
      finca ?
         this.finca = finca :
         this.finca = <Finca>{};
      return this.fb.group({
         name: [this.finca.name, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
         ])],
         area: [this.finca.area, Validators.compose([
            Validators.required,
            CustomValidators.number,
            CustomValidators.range([1, 10000])
         ])],
         // location: this.fb.group({
         latitude: [{ value: this.finca.location || '', disabled: true }, Validators.compose([
            Validators.required,
            CustomValidators.number
         ])],
         longitude: [{ value: this.finca.location || '', disabled: true }, Validators.compose([
            Validators.required,
            CustomValidators.number
         ])]
         // })
      });
   }

   public get FormError(): { [id: string]: string } {
      return this.formError;
   }

   public get ValidationMessage(): { [id: string]: { [id: string]: string } } {
      return this.validationMessage;
   }
}