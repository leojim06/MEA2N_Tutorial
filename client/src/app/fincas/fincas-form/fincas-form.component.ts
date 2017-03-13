import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Finca, FincasService, FincasFormService } from '../shared';
import { Marker } from '../../shared/models';
import { MouseEvent } from 'angular2-google-maps/core';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-fincas-form',
  templateUrl: './fincas-form.component.html',
  styleUrls: ['./fincas-form.component.css']
})
export class FincasFormComponent implements OnInit {

  private fincaForm: FormGroup;
  private formError: { [id: string]: string };
  private validationMessage: { [id: string]: { [id: string]: string } };
  @Input() finca: Finca;

  private markers: Marker[];
  private mapaClicked: boolean = false;

  private latitude: number = 1.2148514;
  private longitude: number = -77.2805607;
  private zoom: number = 12;

  constructor(
    private fincasService: FincasService,
    private fincasFormService: FincasFormService,
    private notificationsService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formError = this.fincasFormService.FormError;
    this.validationMessage = this.fincasFormService.ValidationMessage;
  }

  ngOnInit() {
    this.setCurrentPosition();
    this.initForm();
    this.lookChanges();
  }

  private setCurrentPosition() {
    this.markers = <Marker[]>[];
    this.markers.push({
      latitude: this.latitude,
      longitude: this.longitude,
      label: 'Mi Ubicación',
      draggable: false
    })
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markers[0].latitude = position.coords.latitude;
        this.markers[0].longitude = position.coords.longitude;
      });
    }
  }

  private mapClicked($event: MouseEvent) {
    if (!this.mapaClicked) {
      this.mapaClicked = !this.mapaClicked;
      this.markers.push({
        latitude: $event.coords.lat,
        longitude: $event.coords.lng,
        label: 'Nueva Finca',
        draggable: true
      });
      this.updateLocation($event.coords.lat, $event.coords.lng);
    }
  }

  private markerDragEnd(m: Marker, $event: MouseEvent) {
    this.markers[1].latitude = $event.coords.lat;
    this.markers[1].longitude = $event.coords.lng;
    this.updateLocation($event.coords.lat, $event.coords.lng);
  }

  private updateLocation(latitude, longitude): void {
    this.fincaForm.controls['latitude'].setValue(latitude);
    this.fincaForm.controls['longitude'].setValue(longitude);
  }

  private initForm(): void {

    if (this.finca) {
      this.fincaForm = this.fincasFormService.initForm(this.finca);
      if (!this.mapaClicked) {
        this.mapaClicked = !this.mapaClicked
      }
      this.markers.push({
        latitude: this.finca.location[0],
        longitude: this.finca.location[1],
        label: this.finca.name,
        draggable: true
      });
      this.updateLocation(this.finca.location[0], this.finca.location[1]);
    } else {
      this.fincaForm = this.fincasFormService.initForm();
    }


    // this.finca ?
    //   this.fincaForm = this.fincasFormService.initForm(this.finca) :
    //   this.fincaForm = this.fincasFormService.initForm();
  }

  private lookChanges(): void {
    this.fincaForm.valueChanges
      .map(value => { return value; })
      .subscribe(data => {
        this.onValueChanged(data)
      },
      error => {
        console.error(`error: ${error}`);
      });
  }

  private onValueChanged(data: any): void {
    for (let field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        let hasError = this.fincaForm.controls[field].dirty;
        this.formError[field] = '';
        if (hasError) {
          for (let key in this.fincaForm.controls[field].errors) {
            if (this.fincaForm.controls[field].errors.hasOwnProperty(key)) {
              this.formError[field] += this.validationMessage[field][key] + "\n";
            }
          }
        }
      }
    }
  }

  private onSubmit({ value, valid }: { value: any, valid: boolean }) {
    let title: string;
    let body: string;
    if (valid) {
      let newFinca: Finca = <Finca>{};
      this.finca ? newFinca._id = this.finca._id : null;
      newFinca.name = value.name;
      newFinca.area = value.area;
      newFinca.location = [
        // parseFloat(value.latitude),
        // parseFloat(value.longitude)
        parseFloat(this.fincaForm.controls['latitude'].value),
        parseFloat(this.fincaForm.controls['longitude'].value)
      ];

      if (this.finca) {
        this.fincasService.update(newFinca).subscribe((result: any) => {
          title = 'Finca Actualizada';
          body = `La finca ${value.name} fue actualizada`;
          this.notificationsService.success(title, body);
          this.clear();
          this.router.navigate(['/fincas']);
        }, error => {
          this.notificationsService.error(error.ERROR, error.MSG);
        });
      } else {
        this.route.params
          .switchMap((params: Params) => this.fincasService.create(params['id'], newFinca))
          .subscribe((result: any) => {
            title = 'Finca Creada';
            body = `La finca ${value.name} fue creada`;
            this.notificationsService.success(title, body);
            this.clear();
            this.router.navigate(['/propietarios']);
          }, error => {
            this.notificationsService.error(error.ERROR, error.MSG);
          });
      }
    }
  }

  private clear() {
    this.fincaForm.reset();
    this.initForm();
    this.lookChanges();
  }



}
