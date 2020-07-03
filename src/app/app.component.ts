import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAdmin: boolean = false;
  setIsAdmin = ( status: boolean ) => {
    this.isAdmin = status;
  }
}


