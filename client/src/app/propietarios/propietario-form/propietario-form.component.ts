import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Propietario, PropietariosService, PropietarioFormService } from '../shared';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-propietario-form',
  templateUrl: './propietario-form.component.html',
  styleUrls: ['./propietario-form.component.css']
})
export class PropietarioFormComponent implements OnInit {

  private propietarioForm: FormGroup;
  private formError: { [id: string]: string };
  private validationMessage: { [id: string]: { [id: string]: string } };
  @Input() propietario: Propietario;

  constructor(
    private propietariosService: PropietariosService,
    private propietarioFormService: PropietarioFormService,
    private notificationsService: NotificationsService,
    // private route: ActivatedRoute,
    private router: Router
  ) {
    this.formError = this.propietarioFormService.FormError;
    this.validationMessage = this.propietarioFormService.ValidationMessage;
  }

  ngOnInit() {
    this.initForm();
    this.lookChanges();
  }

  private initForm() {
    this.propietario ?
      this.propietarioForm = this.propietarioFormService.initForm(this.propietario) :
      this.propietarioForm = this.propietarioFormService.initForm();
  }

  private lookChanges(): void {
    this.propietarioForm.valueChanges
      .map(value => { return value; })
      .subscribe(data => {
        this.onValueChanged(data);
      },
      error => {
        console.error(`error: ${error}`);
      });
  }

  private onValueChanged(data: any): void {

    for (let field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        let hasError = this.propietarioForm.controls[field].dirty;
        this.formError[field] = '';
        if (hasError) {
          for (let key in this.propietarioForm.controls[field].errors) {
            if (this.propietarioForm.controls[field].errors.hasOwnProperty(key)) {
              this.formError[field] += this.validationMessage[field][key] + "\n";
            }
          }
        }
      }
    }
  }

  private onSubmit({ value, valid }: { value: Propietario, valid: boolean }) {
    if (valid) {
      if (this.propietario) value._id = this.propietario._id;
      this.propietariosService.save(value).subscribe((result: any) => {
        let title: string = 'Propietario Creado';
        let body: string = `El propietario ${value.fName} ${value.lName} se creó exitosamente`;
        if (this.propietario) {
          title = 'Propietario Actualizado';
          body = `El propietario ${value.fName} ${value.lName} fue acutalizdo`;
        }
        this.notificationsService.success(title, body)
        this.clear();
        this.router.navigate(['/propietarios']);
      }, error => {
        this.notificationsService.error(error.ERROR, error.MSG);
      });
    }
  }

  private clear() {
    this.propietarioForm.reset();
    this.initForm();
    this.lookChanges();
  }

}
