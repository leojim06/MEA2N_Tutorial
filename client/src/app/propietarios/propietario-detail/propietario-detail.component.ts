import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { PropietariosService, Propietario } from '../shared';
import { slideInDownAnimation } from '../../animations';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-propietario-detail',
  templateUrl: './propietario-detail.component.html',
  styleUrls: ['./propietario-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class PropietarioDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  private propietario: Propietario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propietariosService: PropietariosService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.propietariosService.get(params['id']))
      .subscribe((propietario: Propietario) => this.propietario = propietario,
      error => {
        this.notificationsService.error(error.ERROR, error.MSG);
      });
  }

  private gotoPropietarios(): void {
    this.router.navigate(['/propietarios']);
  }

  private goBack(): void {
    window.history.back();
  }

  private propietarioEdit(propietario: Propietario): void {
    this.router.navigate(['/propietarios/edit', propietario._id])
  }
}
