import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  route: string;

  constructor(readonly router: Router) {
    this.route = '';
  }

  ngOnInit(): void {
    
  }

}
