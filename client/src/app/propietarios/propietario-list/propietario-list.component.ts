import { Component, OnInit, HostBinding, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { PropietariosService, Propietario } from '../shared';
import { slideInDownAnimation } from '../../animations'

import { NotificationsService } from 'angular2-notifications';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-propietario-list',
  templateUrl: './propietario-list.component.html',
  styleUrls: ['./propietario-list.component.css'],
  animations: [slideInDownAnimation]
})
export class PropietarioListComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  private propietarios: Propietario[];

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private propietariosService: PropietariosService,
    private notificationsService: NotificationsService,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.propietariosService.get('').subscribe(
      (propietarios: Propietario[]) => {
        this.propietarios = propietarios;
        this.changeDetectorRef.markForCheck();
      }, error => {
        this.notificationsService.error(error.ERROR, error.MSG)
      });
  }

  private propietarioDetail(propietario: Propietario): void {
    this.router.navigate(['/propietarios/detail', propietario._id]);
  }

  private propietarioEdit(propietario: Propietario): void {
    this.router.navigate(['/propietarios/edit', propietario._id]);
  }

  private propietarioFincaDetail(propietario: Propietario): void {
    this.router.navigate(['/propietarios/fincas/detail', propietario._id])
  }

  private propietarioNewFinca(propietario: Propietario): void {
    this.router.navigate(['/propietarios/fincas/new', propietario._id])
  }

  private propietarioDestroy(propietario: Propietario): void {
    this.modal.confirm()
      .size('lg')
      .showClose(false)
      .title('Eliminar Propietario')
      .body(`Desea eliminar al propietario ${propietario.fName} ${propietario.lName}`)
      .isBlocking(true)
      .okBtn('Eliminar')
      .cancelBtn('Cancelar')
      .open()
      .catch((err: any) => { console.log('Error: ' + err) })
      .then((dialog: any) => { return dialog.result })
      .then((result: any) => { this.destroy(propietario) })
      .catch((err: any) => { this.cancel() });
  }

  private destroy(propietario: Propietario): void {
    this.propietariosService.destroy(propietario._id).subscribe(
      (result: any) => {
        this.notificationsService.info(
          'Propietario Eliminado',
          `El propietario ${propietario.fName} ${propietario.lName} se eliminó exitosamente`);
        this.propietarios.splice(this.propietarios.indexOf(propietario), 1);
      }, error => {
        this.notificationsService.error(error.ERROR, error.MSG)
      });
  }

  private cancel(): void {
    this.notificationsService.alert('Eliminación Cancelada', 'Se canceló el proceso de eliminación');
  }

}
