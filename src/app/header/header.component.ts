// import {Component} from '@angular/core';

// @Component( {
//     selector: 'app-header',
//     templateUrl: './header.component.html',
//     styleUrls: ['./header.component.css'] 
// } )
// export class HeaderComponent {

// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Only if you're using a CSS file for styles
})
export class HeaderComponent { }

