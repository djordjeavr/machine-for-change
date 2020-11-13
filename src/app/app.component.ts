import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
isHidden:boolean=false;
  constructor() {}

  isClicked(){
   this.isHidden=true;
  }
}
