import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-luke-skywalker',
  templateUrl: './luke-skywalker.component.html',
  styleUrls: ['./luke-skywalker.component.css']
})
export class LukeSkywalkerComponent implements OnInit {

  @Input() myConfesion: string;
  @Output() lukeAnswer = new EventEmitter();

  ngOnInit() {
    this.lukeAnswer.emit('Luke responde desde su componente --> No... No...! That\'s not true! That\'s imposible!');
  }

}
