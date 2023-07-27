import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransportComponent } from './transport/transport.component';
import { PassengerComponent } from './passenger/passenger.component';
import { ThousandPipePipe } from './thousand-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransportComponent,
    PassengerComponent,
    ThousandPipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
