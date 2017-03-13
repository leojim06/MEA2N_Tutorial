import { Finca, FincasService } from '../shared';
import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'app-fincas-list',
  templateUrl: './fincas-list.component.html',
  styleUrls: ['./fincas-list.component.css']
})
export class FincasListComponent implements OnInit {

  private fincas: Finca[];
  private location: boolean = false;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private fincasService: FincasService,
    private notificationsService: NotificationsService,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private modal: Modal) {
    this.overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.fincasService.get('')
      .subscribe((fincas: Finca[]) => {
        this.fincas = fincas;
        this.changeDetectorRef.markForCheck();
      }, error => {
        this.notificationsService.error(error.ERROR, error.MSG)
      });
  }

  private changeView() {
    this.location = !this.location;
  }

  private fincaDetail(finca: Finca): void {
    this.router.navigate(['/fincas/detail', finca._id]);
  }

  private fincaEdit(finca: Finca): void {
    this.router.navigate(['/fincas/edit', finca._id]);
  }

  private fincaDestroy(finca: Finca): void {
    this.modal.confirm()
      .size('lg')
      .showClose(false)
      .title('Eliminar Finca')
      .body(`Desea eliminar ls finca ${finca.name}`)
      .isBlocking(true)
      .okBtn('Eliminar')
      .cancelBtn('Cancelar')
      .open()
      .catch((err: any) => { console.log('Error: ' + err) })
      .then((dialog: any) => { return dialog.result })
      .then((result: any) => { this.destroy(finca) })
      .catch((err: any) => { this.cancel() });
  }

  private destroy(finca: Finca): void {
    this.fincasService.destroy(finca._id)
      .subscribe((result: any) => {
        this.notificationsService.info(
          'Finca Eliminada',
          `La finca ${finca.name} se eliminó exitosamente`);
        this.fincas.splice(this.fincas.indexOf(finca), 1);
      }, error => {
        this.notificationsService.error(error.ERROR, error.MSG);
      });
  }

  private cancel(): void {
    this.notificationsService.alert('Eliminación Cancelada', 'Se canceló el proceso de eliminación');
  }

}
