import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerComponent } from './passenger/passenger.component';
import { TransportComponent } from './transport/transport.component';

const routes: Routes = [
  {
    path: 'transport',
    component: TransportComponent
  }, {
    path: '*',
    redirectTo: 'transport'
  }, {
    path: 'passenger-details',
    component: PassengerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
