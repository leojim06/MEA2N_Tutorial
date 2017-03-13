import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { Finca, FincasService } from '../shared';

import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-fincas-detail',
  template:
  `<div *ngIf="finca">
    <app-mapa-fincas [finca]="finca" ></app-mapa-fincas>
    <div class="row text-center">
      <button type="button" class="btn-primary" (click)="goBack()">Atras</button>
    </div>
  </div>`,
  styleUrls: ['./fincas-detail.component.css'],
})
export class FincasDetailComponent implements OnInit {

  private finca: Finca;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fincasService: FincasService,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.fincasService.get(params['id']))
      .subscribe((finca: Finca) => this.finca = finca,
      error => {
        this.notificationsService.error(error.ERROR, error.MSG);
      });
  }

  private goBack(): void {
    window.history.back();
  }
}
