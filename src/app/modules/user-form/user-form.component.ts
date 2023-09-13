import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../core/model/user.model';
import {Location} from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User | undefined;
  cargado = false;
  userId: number;
  existe = false;

  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(25)]],
    lastName: ['', Validators.required, Validators.maxLength(40)],
    maidenName: [''],
    age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
    password: ['', Validators.required, Validators.minLength(8)],
    birthDate: ['', Validators.required],
    height: ['', Validators.min(0)],
    weight: ['', Validators.min(0)],
  });


  constructor(private readonly userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.userId = 0;
  }


  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId == 0) this.initializeEmptyUser();
    else {
      this.loadData();
      this.existe = true;
    }
    this.cargado = true;
  }

  initializeEmptyUser() {
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      maidenName: '',
      age: 0,
      gender: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      birthDate: '',
      image: '',
      bloodGroup: '',
      height: 0,
      weight: 0,
      eyeColor: '',
      hair: {
        color: '',
        type: ''
      },
      domain: '',
      ip: '',
      address: {
        address: '',
        city: '',
        coordinates: {
          lat: 0,
          lng: 0
        },
        postalCode: '',
        state: '',
      },
      macAddress: '',
      university: '',
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: ''
      },
      company: {
        address: {
          address: '',
          city: '',
          coordinates: {
            lat: 0,
            lng: 0,
          },
          postalCode: '',
          state: ''
        },
        department: '',
        name: '',
        title: ''
      },
      ein: '',
      ssn: '',
      userAgent: ''
    }
  }

  async loadData() {

    await this.getUser(this.userId);

    if (!this.user) {
      return;
    }

    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      maidenName: this.user.maidenName,
      age: this.user.age,
      gender: this.user.gender,
      email: this.user.email,
      phone: this.user.phone,
      username: this.user.username,
      password: this.user.password,
      birthDate: this.user.birthDate,
      height: this.user.height,
      weight: this.user.weight,
    });
  }

  async getUser(userId: number) {
    this.user = await firstValueFrom(this.userService.getUserById(userId));
  }

  onSubmit() {
    if (this.user){
      let newUser = this.userForm.getRawValue() as User;
      this.user.firstName = newUser.firstName;
      this.user.lastName = newUser.lastName;
      this.user.maidenName = newUser.maidenName;
      this.user.age = newUser.age;
      this.user.gender = newUser.gender;
      this.user.email = newUser.email;
      this.user.phone = newUser.phone;
      this.user.username = newUser.username;
      this.user.password = newUser.password;
      this.user.birthDate = newUser.birthDate;
      this.user.height = newUser.height;
      this.user.weight = newUser.weight;
    if (this.existe) {
      console.log(this.user);
      this.updateUser();
    } else {
      this.addUser();
    }
    }
    
  }
  addUser() {
    if (this.user){
      this.userService.addUser(this.user)
      .subscribe({
        next: (response) => {
        console.log(this.user);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }


  updateUser() {
    if (this.user){
      this.userService.updateUser(this.user)
      .subscribe({
        next: (response) => {
          this.user = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}



