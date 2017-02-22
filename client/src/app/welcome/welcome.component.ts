import { Component, OnInit, } from '@angular/core';
import { WelcomeService } from './shared';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  private message: string = 'No hay resultado';

  constructor(private welcomeService: WelcomeService) { }

  ngOnInit() {
    this.welcomeService.getMessage().subscribe((res: any) => {
      this.message = res.message;
    }, (error: any) => {
      console.error(error);
      // Crear un service que se encargue de las notificaciones
    });

  }
}
