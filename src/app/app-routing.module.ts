import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { TodoComponent } from './pages/todo/todo.component';
import { UsersComponent } from './pages/users/users.component';
import { FlightComponent } from './pages/flightdetails/flight.component';
import { PassengerComponent } from './pages/passengerdetails/passenger.component';
import { TicketComponent } from './pages/ticketdetails/ticket.component';
import { FlightformComponent } from './pages/flightform/flightform.component';
import { TicketformComponent } from './pages/ticketform/ticketform.component';
import { PassengerformComponent } from './pages/passengerform/passengerform.component';


const routes: Routes = [
  {
    path:'users',
    component: UsersComponent
  },
  {
    path:'Employee',
    component: EmployeeComponent
  },
  {
    path: 'todo',
    component: TodoComponent
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
