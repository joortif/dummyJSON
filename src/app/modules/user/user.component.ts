import { Component, OnInit } from '@angular/core';
import { User } from '../../core/model/user.model';
import { UserService } from '../../core/services/user.service';
import { pages } from 'src/app/core/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  limit = pages.numItems;
  cargado = false;
  numElementsPerPage=0;
  total = 0;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.changePage(0);
  }

  getAll() {
    this.userService.getAllUsers().subscribe({
      next: response => {
        this.users = response.users;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
      }
    });
  }

  changePage(page: number) {
    this.userService.getUsersInterval(this.limit, this.limit * page)
    .subscribe({
      next: response => {
        this.users = response.users;
        this.total = response.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
      }
    });
  }

  searchUser(name: string) {
    this.userService.searchUser(name)
    .subscribe({
      next: response => {
        this.users = response.users;
        this.total = response.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
      }
    });
  }

}
