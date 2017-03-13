import { Component, OnInit, Input } from '@angular/core';

import { Finca, PropietarioFinca } from '../shared';
import { Marker } from '../../shared/models'

@Component({
  selector: 'app-mapa-fincas',
  templateUrl: './mapa-fincas.component.html',
  styleUrls: ['./mapa-fincas.component.css']
})
export class MapaFincasComponent implements OnInit {

  @Input() finca: Finca;
  @Input() propietario: PropietarioFinca;
  @Input() lista: Finca[];

  private markers: Finca[];
  private title: string = 'Fincas';
  private zoom: number = 8;
  private latitude: number = 1.214636;
  private longitude: number = -77.278267;

  constructor() { }

  ngOnInit() {
    this.markers = [];
    if (this.finca) {
      this.title = this.finca.name
      this.markers.push(this.finca);
    } else if (this.propietario) {
      if (this.propietario.fincas.length === 0) {
        this.title = `El propietario ${this.propietario.fName} ${this.propietario.lName} aun no tiene fincas`
      } else {
        this.title = `Fincas de ${this.propietario.fName} ${this.propietario.lName}`
        this.propietario.fincas.forEach(finca => {
          this.markers.push(finca);
        });
      }
    } else if (this.lista) {
      this.title = '';
      this.lista.forEach(finca => {
        this.markers.push(finca);
      });
    } else {
      this.title = 'No hay registros';
    }
  }

  private goBack(): void {
    window.history.back();
  }

}
