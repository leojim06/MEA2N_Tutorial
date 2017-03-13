import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { FincasService, Finca } from '../shared';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-fincas-edit',
  template:
  `<div *ngIf="finca">
    <app-fincas-form [finca]="finca"></app-fincas-form>
  </div>`

})
export class FincasEditComponent implements OnInit {
  private finca: Finca;

  constructor(
    private route: ActivatedRoute,
    private fincasService: FincasService,
    private notifictionsService: NotificationsService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.fincasService.get(params['id']))
      .subscribe((finca: Finca) => this.finca = finca,
      error => this.notifictionsService.error(error.ERROR, error.MSG));
  }

}
