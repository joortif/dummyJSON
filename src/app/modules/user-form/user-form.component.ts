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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    maidenName: ['', Validators.required],
    age: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    birthDate: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    eyeColor: ['', Validators.required],
    hair: this.formBuilder.group({
      color: ['', Validators.required],
      type: ['', Validators.required]
    }),
    domain: ['', Validators.required],
    ip: ['', Validators.required],
    address: this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      coordinates: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      }),
      postalCode: ['', Validators.required],
      state: ['', Validators.required],
    }),
    macAddress: ['', Validators.required],
    university: ['', Validators.required],
    bank: this.formBuilder.group({
      cardExpire: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardType: ['', Validators.required],
      currency: ['', Validators.required],
      iban: ['', Validators.required]
    }),
    company: this.formBuilder.group({
      address: this.formBuilder.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        coordinates: this.formBuilder.group({
          lat: ['', Validators.required],
          lng: ['', Validators.required]
        }),
        postalCode: ['', Validators.required],
        state: ['', Validators.required],
      }),
      department: ['', Validators.required],
      name: ['', Validators.required],
      title: ['', Validators.required]
    })
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
      bloodGroup: this.user.bloodGroup,
      height: this.user.height,
      weight: this.user.weight,
      eyeColor: this.user.eyeColor,
      hair: {
        color: this.user.hair.color,
        type: this.user.hair.type,
      },
      domain: this.user.domain,
      ip: this.user.ip,
      address: {
        address: this.user.address.address,
        city: this.user.address.city,
        coordinates: {
          lat: this.user.address.coordinates.lat,
          lng: this.user.address.coordinates.lng,
        },
        postalCode: this.user.address.postalCode,
        state: this.user.address.state,
      },
      macAddress: this.user.macAddress,
      university: this.user.university,
      bank: {
        cardExpire: this.user.bank.cardExpire,
        cardNumber: this.user.bank.cardNumber,
        cardType: this.user.bank.cardType,
        currency: this.user.bank.currency,
        iban: this.user.bank.iban
      },
      company: {
        address: {
          address: this.user.address.address,
          city: this.user.address.city,
          coordinates: {
            lat: this.user.address.coordinates.lat,
            lng: this.user.address.coordinates.lng,
          },
          postalCode: this.user.address.postalCode,
          state: this.user.address.state,
        },
        department: this.user.company.department,
        name: this.user.company.name,
        title: this.user.company.title,
      }
    });
  }

  async getUser(userId: number) {
    this.user = await firstValueFrom(this.userService.getUserById(userId));
  }

  onSubmit() {
    this.user = this.userForm.getRawValue() as User;
    if (this.existe) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
  addUser() {
    if (this.user) {
      this.userService.createUser(this.user)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        });
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



