import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Propietario } from '../propietario.model';
import { CustomValidators } from '../../../shared/validators'

@Injectable()
export class PropietarioFormService {

   private formError: { [id: string]: string };
   private validationMessage: { [id: string]: { [id: string]: string } };
   private propietario: Propietario;

   constructor(private fb: FormBuilder) {
      this.formError = {
         'fName': '',
         'lName': '',
         'gender': '',
         'email': '',
         'age': ''
      };

      this.validationMessage = {
         'fName': {
            'required': 'El nombre del propietario es requerido',
            'nameString': 'El nombre no puede tener caracteres especiales',
            'minlength': 'El nombre no puede tener menos de 3 caracteres',
            'maxlength': 'El nombre no puede tener más de 50 caracteres'
         },
         'lName': {
            'required': 'El apellido del propietario es requerido',
            'nameString': 'El apellido no puede tener caracteres especiales',
            'minlength': 'El apellido no puede tener menos de 3 caracteres',
            'maxlength': 'El apellido no puede tener más de 50 caracteres',
         },
         'gender': {
            'required': 'El genero es requerido'
         },
         'email': {
            'required': 'El email es requerido',
            'email': 'El email es invalido'
         },
         'age': {
            'required': 'La edad es requerida',
            'number': 'La edad debe ser un número válido',
            'range': 'La edad debe estar en el rango de 1 a 100 años'
         }
      }
   }

   public initForm(propietario?: Propietario): FormGroup {
      propietario ?
         this.propietario = propietario :
         this.propietario = <Propietario>{}

      return this.fb.group({
         fName: [this.propietario.fName, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            CustomValidators.nameString
         ])],
         lName: [this.propietario.lName, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            CustomValidators.nameString
         ])],
         gender: [this.propietario.gender, Validators.required],
         age: [this.propietario.age, Validators.compose([
            Validators.required,
            CustomValidators.number,
            CustomValidators.range([1, 100])
         ])],
         email: [this.propietario.email, Validators.compose([
            Validators.required,
            CustomValidators.email
         ])]
      });
   }

   public get FormError(): { [id: string]: string } {
      return this.formError;
   }

   public get ValidationMessage(): { [id: string]: { [id: string]: string } } {
      return this.validationMessage;
   }
}