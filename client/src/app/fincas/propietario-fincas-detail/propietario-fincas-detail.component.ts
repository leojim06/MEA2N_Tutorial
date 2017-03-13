import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { PropietarioFinca, FincasService } from '../shared';

import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-propietario-fincas-detail',
  template:
  `<div *ngIf="propietario">
    <app-mapa-fincas [propietario]="propietario" ></app-mapa-fincas>
    <div class="row text-center">
      <button type="button" class="btn-primary" (click)="goBack()">Atras</button>
    </div>
  </div>`,
  styleUrls: ['./propietario-fincas-detail.component.css']
})
export class PropietarioFincasDetailComponent implements OnInit {

  private propietario: PropietarioFinca;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fincasService: FincasService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.fincasService.populate(params['id']))
      .subscribe((propietario: PropietarioFinca) => this.propietario = propietario,
      error => {
        this.notificationsService.error(error.ERROR, error.MSG);
      });
  }

  private goBack(): void {
    window.history.back();
  }
}
