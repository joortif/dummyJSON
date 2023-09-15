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
  appliedFilters = false;
  numElementsPerPage = 0;
  currentPage = 0;
  total = 0;
  filtersActive = false;
  firstName = undefined;
  lastName = undefined;
  age = undefined;
  username = undefined;
  birthDate = undefined;
  gender = undefined;

  constructor(private readonly userService: UserService) {

  }

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
    this.currentPage = page;
    if (this.appliedFilters){
      this.applyFilters();
    } else {
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
    
  }

  showFilters() {
    this.filtersActive = !this.filtersActive;
  }

  applyFilters() {
    this.appliedFilters = true;
    if (this.firstName) {
      this.userService.filterUsers('firstName', this.firstName, this.limit, this.limit * this.currentPage)
        .subscribe({
          next: response => {
            this.users = response.users;
            this.total = response.total;
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else if (this.age) {
      this.userService.filterUsers('age', this.age, this.limit, this.limit * this.currentPage)
        .subscribe({
          next: response => {
            this.users = response.users;
            this.total = response.total;
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else if (this.username) {
      this.userService.filterUsers('username', this.username, this.limit, this.limit * this.currentPage)
        .subscribe({
          next: response => {
            this.users = response.users;
            this.total = response.total;
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else if (this.gender) {
      this.userService.filterUsers('gender', this.gender, this.limit, this.limit * this.currentPage)
        .subscribe({
          next: response => {
            this.users = response.users;
            this.total = response.total;
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else if (this.birthDate) {
      this.userService.filterUsers('birthDate', this.birthDate, this.limit, this.limit * this.currentPage)
        .subscribe({
          next: response => {
            this.users = response.users;
            this.total = response.total;
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else if (this.lastName) {
      this.userService.filterUsers('lastName', this.lastName, this.limit, this.limit * this.currentPage)
       .subscribe({
          next: response => {
            this.users = response.users;
            this.total = response.total;
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else {
      this.userService.getAllUsers()
      .subscribe({
        next: response => {
          this.users = response.users;
          this.total = response.total;
          this.appliedFilters = false;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  searchUser(name: string) {
    this.resetFilters();
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

  resetFilters(){
    this.filtersActive = false;
    this.firstName = undefined;
    this.lastName = undefined;
    this.age = undefined;
    this.username = undefined;
    this.birthDate = undefined;
    this.gender = undefined;
  }

}
