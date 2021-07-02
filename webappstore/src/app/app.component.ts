import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { slideInAnimation } from './animations/slide-pages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'webappstore';

  prepareRoute(outlet: RouterOutlet) {
     
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  
  }

}
