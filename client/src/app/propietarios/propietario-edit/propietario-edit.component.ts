import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PropietariosService, Propietario } from '../shared';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-propietario-edit',
  template:
  `<div *ngIf="propietario">
    <app-propietario-form [propietario]="propietario" ></app-propietario-form>
  </div>`
})
export class PropietarioEditComponent implements OnInit {

  private propietario: Propietario;

  constructor(
    private route: ActivatedRoute,
    private propietariosService: PropietariosService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.propietariosService.get(params['id']))
      .subscribe((propietario: Propietario) => this.propietario = propietario,
      error => this.notificationsService.error(error.ERROR, error.MSG));
  }

}
