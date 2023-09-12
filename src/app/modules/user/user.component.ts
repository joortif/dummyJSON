import { Component, OnInit } from '@angular/core';
import { User } from '../../core/model/user.model';
import { UserResponse } from '../../core/model/user-response.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  getAll() {
    this.userService.getAllUsers().subscribe({
      next: response => {
        this.users = response.users;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
