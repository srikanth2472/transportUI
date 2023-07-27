import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { BusDto, PassengerDto } from '../entity';
import { ThousandPipePipe } from '../thousand-pipe.pipe';
declare var $: any;

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  
  busList: BusDto[] = [];
  transportDetails = new FormGroup({
    id: new FormControl(0),
    busCode: new FormControl('')
  });
  busDto: BusDto = new BusDto();
  busId: number = 0;
  busCode: string = '';
  addTransport: boolean = false;
  searchText: string = '';
  viewAll: boolean = false;
  value: number = 10000000000;

  constructor(private appService: AppService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.fetchTransportDetails();
  }

  fetchTransportDetails() {
    this.appService.fetchAllTransportDetails().subscribe(data => {
      this.busList = <BusDto[]>data;
    }, error => {
      console.log(error.error.message);
      this.busList = [];
    });
  }

  addTransportDetailsModal() {
    this.transportDetails = this.fb.group({
      id: [0],
      busCode: ['', Validators.required]
    });
    this.addTransport = true;
  }

  saveTransportDetails() {
    this.busDto = <BusDto>this.transportDetails.value;
    this.appService.addOrUpdateBus(this.busDto).subscribe(res => {
      this.fetchTransportDetails();
    }, error => {
      console.log(error.error.message);
    });
  }

  updateTransportDetailsModal(busId: number, busCode: string) {
    this.transportDetails = this.fb.group({
      id: [busId],
      busCode: [busCode, Validators.required]
    });
    $('#addBus').modal('show');
    this.addTransport = false;
  }

  deleteBusDetailsModal(busId: number, busCode: string) {
    $('#deleteBus').modal('show');
    this.busId = busId;
    this.busCode = busCode;
  }

  deleteBusDetails() {
    this.appService.deleteBusDetails(this.busId).subscribe(res => {
      this.fetchTransportDetails();
    }, error => {
      console.log(error.error.message);
    });
  }

  goToPassengerComponent(viewAll: boolean, event?: any, busId?: number) {
    if (event == undefined || event.target.nodeName != "SPAN") {
      this.route.navigate(['passenger-details', {viewAll: viewAll, busId: busId}]);
    }
  }

  filterTransportDetails() {
    if (this.searchText != '') {
      this.appService.filterTransportDetails(this.searchText).subscribe(data => {
        this.busList = <BusDto[]>data;
      }, error => {
        console.log(error.error.message);
        this.busList = [];
      });
    } else {
      this.fetchTransportDetails();
    }
  }

}
