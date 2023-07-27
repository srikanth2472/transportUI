import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { PassengerDto } from '../entity';
declare var $: any;

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  viewAll: any;
  busId: any;
  addPassenger: boolean = false;
  passengerDetails = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    email: new FormControl(''),
    busId: new FormControl(0)
  });
  passengerDto: PassengerDto = new PassengerDto();
  passengerId: number = 0;
  passengerName: string = '';
  showAllPassengers: boolean = false;
  searchText: string = '';
  busCode: string = '';
  passengerList: PassengerDto[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService, private fb: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.busId = this.route.snapshot.paramMap.get('busId');
    if (this.route.snapshot.paramMap.get('viewAll') == "true") {
      this.showAllPassengers = true;
      this.fetchAllPassengerDetails();
    } else{ 
      this.showAllPassengers = false;
      this.fetchPassengerDetailsForABus();
    }
  }

  goBack() {
    this.router.navigate(['transport']);
  }

  savePassengerDetailsModal() {
    this.passengerDetails = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      busId: [this.busId]
    });
    this.addPassenger = true;
  }

  savePassengerDetails() {
    this.passengerDto = <PassengerDto>this.passengerDetails.value;
    this.appService.savePassengersForABus(this.passengerDto).subscribe(res => {
      this.fetchPassengerDetailsForABus();
    }, error => {
      console.log(error.error.message);
    });
  }

  fetchPassengerDetailsForABus() {
    this.appService.fetchPassengersForABus(this.busId).subscribe(res => {
      this.passengerList = <PassengerDto[]>res;
      this.busCode = this.passengerList[0].busCode;
      this.showAllPassengers = false;
    }, error => {
      console.log(error.error.message);
      this.passengerList = [];
    });
  }

  updatePassengerDetailsModal(passenger: PassengerDto) {
    this.passengerDetails = this.fb.group({
      id: [passenger.id],
      name: [passenger.name, Validators.required],
      email: [passenger.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      busId: [this.busId]
    });
    $('#addPassenger').modal('show');
    this.addPassenger = false;
  }

  updatePassengerDetails() {
    this.passengerDto = <PassengerDto>this.passengerDetails.value;
    this.appService.updatePassenger(this.passengerDto).subscribe(res => {
      if (this.showAllPassengers) {
        this.fetchAllPassengerDetails();
      } else {
        this.fetchPassengerDetailsForABus();
      }
    }, error => {
      console.log(error.error.message);
    });
  }

  deletePassengerDetailsModal(passengerId: number, name: string) {
    $('#deletePassenger').modal('show');
    this.passengerId = passengerId;
    this.passengerName = name;
  }

  deletePassengerDetails() {
    this.appService.deletePassenger(this.passengerId).subscribe(res => {
      if (this.showAllPassengers) {
        this.fetchAllPassengerDetails();
      } else {
        this.fetchPassengerDetailsForABus();
      }
    }, error => {
      console.log(error.error.message);
    });
  }

  fetchAllPassengerDetails() {
    this.appService.fetchAllPassengers().subscribe(res => {
      this.passengerList = <PassengerDto[]>res;
      this.showAllPassengers = true;
    }, error => {
      console.log(error.error.message);
      this.passengerList = [];
    });
  }

  filterPassengerDetails() {
    if (this.searchText != '') {
      if (this.showAllPassengers) {
        this.appService.filterPassengerDetails(this.searchText).subscribe(data => {
          this.passengerList = <PassengerDto[]>data;
        }, error => {
          console.log(error.error.message);
          this.passengerList = [];
        });
      } else {
        this.appService.filterPassengerDetailsForABus(this.busId, this.searchText).subscribe(data => {
          this.passengerList = <PassengerDto[]>data;
        }, error => {
          console.log(error.error.message);
          this.passengerList = [];
        });
      }
    } else {
      if (this.showAllPassengers) {
        this.fetchAllPassengerDetails();
      } else {
        this.fetchPassengerDetailsForABus();
      }
    }
  }

}
