import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  active = true;
  loaded = false;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.testConexion();
  }

  testConexion() {
    this.userService.test()
      .subscribe({
        next: response => {
          if (response.status != "ok") {
            this.active = false;
          }
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
            this.loaded = true;
        },
      }
      )
  }

}
