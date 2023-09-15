import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  route: string;

  constructor() {
    this.route = '';
    this.getCurrentRoute();
  }

  ngOnInit(): void {
    
  }

  getCurrentRoute() {
    let parts = window.location.href.split('/');
    this.route = parts[3];
    console.log(this.route);
  }

}
