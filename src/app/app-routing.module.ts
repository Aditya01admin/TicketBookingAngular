import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './pages/flightdetails/flight.component';
import { PassengerComponent } from './pages/passengerdetails/passenger.component';
import { TicketComponent } from './pages/ticketdetails/ticket.component';
import { FlightformComponent } from './pages/flightform/flightform.component';
import { TicketformComponent } from './pages/ticketform/ticketform.component';
import { PassengerformComponent } from './pages/passengerform/passengerform.component';
import { HomieComponent } from './pages/homie/homie.component';

const routes: Routes = [
  {
    path:'Homie',
    component:HomieComponent
  },
  { 
    path: 'passengerform/:id',
    component: PassengerformComponent 
  },
  { 
    path: 'flightform/:id',
    component: FlightformComponent 
  },
  {
    path:'ticketform/:id',
    component: TicketformComponent
  },
  { 
    path: 'flights', 
    component: FlightComponent 
  },
  { 
    path: 'passengers', 
    component: PassengerComponent 
  },
  { 
    path: 'tickets', 
    component: TicketComponent }
    ,
  { 
    path: 'flightsform', 
    component: FlightformComponent 
  },
  { 
    path: 'ticketform', 
    component: TicketformComponent 
  },
  { 
    path: 'passengerform', 
    component: PassengerformComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
