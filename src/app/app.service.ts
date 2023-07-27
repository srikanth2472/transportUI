import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusDto, PassengerDto } from './entity';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = 'http://localhost:8080/transport/';

  constructor(private http: HttpClient) { }

  public fetchAllTransportDetails() {
    return this.http.get<any>(this.url + 'fetch-all-transport-details');
  }

  public addOrUpdateBus(busDto: BusDto) {
    return this.http.post<any>(this.url + 'add-or-update-bus', busDto);
  }

  public deleteBusDetails(busId: number) {
    return this.http.delete<any>(this.url + 'delete-bus-details?busId=' + busId);
  }

  public savePassengersForABus(passengerDto: PassengerDto) {
    return this.http.post<any>(this.url + 'save-passenger-for-a-bus', passengerDto);
  }

  public fetchPassengersForABus(busId: number) {
    return this.http.get<any>(this.url + 'fetch-passenger-details-for-a-bus?busId=' + busId);
  }

  public updatePassenger(passengerDto: PassengerDto) {
    return this.http.put<any>(this.url + 'update-passenger', passengerDto);
  }

  public deletePassenger(passengerId: number) {
    return this.http.delete<any>(this.url + 'delete-passenger?passengerId=' + passengerId);
  }

  public fetchAllPassengers() {
    return this.http.get<any>(this.url + 'fetch-all-passenger-details');
  }

  public filterTransportDetails(searchText: string) {
    return this.http.get<any>(this.url + 'search-by-bus-code?searchText=' + searchText);
  }

  public filterPassengerDetails(searchText: string) {
    return this.http.get<any>(this.url + 'search-by-passenger-details?searchText=' + searchText);
  }

  public filterPassengerDetailsForABus(busId: number, searchText: string) {
    return this.http.get<any>(this.url + 'search-by-passenger-details-for-a-bus?busId=' + busId +
     '&searchText=' + searchText);
  }
}
