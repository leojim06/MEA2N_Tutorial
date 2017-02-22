import { Component } from '@angular/core';
import { LukeSkywalkerComponent } from '../luke-skywalker/luke-skywalker.component';

@Component({
  selector: 'app-darth-vader',
  templateUrl: './darth-vader.component.html',
  styleUrls: ['./darth-vader.component.css'],
})
export class DarthVaderComponent {

  private myConfesion: string = 'I am your father!';
  private lukeAnswer: string = '';

  // CHARACTERS
  private father: string = 'Darth Vader';
  private son: string = 'Luke Skywalker';

  onAnswer(answer: string) {
    this.lukeAnswer = answer;
  }

}
