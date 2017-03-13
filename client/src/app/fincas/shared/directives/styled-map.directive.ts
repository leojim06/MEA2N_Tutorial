import { Directive } from '@angular/core';

import { GoogleMapsAPIWrapper, } from 'angular2-google-maps/core';
import { MapOptions } from "angular2-google-maps/core/services/google-maps-types";

@Directive({
  selector: '[styled-map]'
})
export class StyledMapDirective {

  constructor(private wrapper: GoogleMapsAPIWrapper) {
    this.wrapper.getNativeMap().then((map) => {
      let options: MapOptions = {
        minZoom: 8,
        maxZoom: 15,
        disableDefaultUI: true,
        // scrollwheel: true,
        draggable: true,
        disableDoubleClickZoom: true,
        // panControl: false,
        scaleControl: false,
        styles: [
          {
            stylers: [
              { saturation: -100 }
            ]
          }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              { lightness: 100 },
              { visibility: "simplified" }
            ]
          }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }, 
          // {
          //   featureTupe: "poi",
          //   elementType: "labels",
          //   stylers: [
          //     { visibility: "off" }
          //   ]
          // }
        ]
      };
      map.setOptions(options);
    });
  }

}
