import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Ticket {
  ticketId: number;
  ticket_number: number;
  flight:{
    flightNo: string;};
  passengers:{
    passengerId: number;
    passengerName: string;};
}

// interface Passenger {
//   passenger_id: number;
//   passengerName: string;
// }

// interface Flight {
//   flightNo: string;
// }

// interface Ticket {
//   ticketId: number;
//   ticket_number: number;
//   flight: Flight;
//   passengers: Passenger[];
// }

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketList: Ticket[] = [];
  headArray = [
    { Head: 'Ticket Number', FieldName: 'ticketNumber' },
    { Head: 'Flight No', FieldName: 'flight.flightNo' },
    { Head: 'Passenger ID', FieldName:'passengers.0.passengerId'},
    { Head: 'Passenger Name', FieldName: 'passengers.0.passengerName' },
    { Head: 'Action', FieldName: '' }
  ];


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTickets();  
  }

  loadTickets() {
    this.http.get<Ticket[]>('http://localhost:8082/tickets').subscribe({
      next: (data) => {
        this.ticketList = data;
      },
      error: (error) => {
        console.error('Error fetching tickets:', error);
      }
    });
  }

  editTicket(item: Ticket) {
    this.router.navigate(['/ticketform',item.ticketId]);
  }

  deleteTicket(item: Ticket) {
    if (confirm(`Are you sure you want to delete ${item.ticketId}?`)){
      this.http.delete(`http://localhost:8082/tickets/${item.ticketId}`).subscribe({
        next: ()=>{
          console.log('Ticket deleted sucessfully');
          this.ticketList=this.ticketList.filter(p=>p.ticketId !== item.ticketId);
        },
        error:(error)=>{
          console.error('Error deleting ticket',error);
        }
      });
    }
  }
}