import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTableComponent } from './widgets/my-table/my-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoTextLengthDirective } from './directives/textarea/auto-text-length.directive';
import { AccordionComponent } from './widgets/accordion/accordion.component';
import { FormsModule } from '@angular/forms';

import { FlightComponent } from './pages/flightdetails/flight.component';
import { PassengerComponent } from './pages/passengerdetails/passenger.component';
import { TicketComponent } from './pages/ticketdetails/ticket.component';
import { FlightformComponent } from './pages/flightform/flightform.component';
import { TicketformComponent } from './pages/ticketform/ticketform.component';
import { PassengerformComponent } from './pages/passengerform/passengerform.component';
import { HomieComponent } from './pages/homie/homie.component';


@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent,
    AutoTextLengthDirective,
    AccordionComponent,
    FlightComponent,
    PassengerComponent,
    TicketComponent,
    TicketformComponent,
    PassengerformComponent,
    FlightformComponent,
    HomieComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }