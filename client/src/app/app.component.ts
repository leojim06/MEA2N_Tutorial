import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'app works!';
    
  private options = {
    position: ["bottom", "right"],
    timeOut: 4000,
    lastOnBottom: true,
    showProgressBar: true,
    animate: "fromRight"
  }
}
