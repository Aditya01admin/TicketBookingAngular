import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Ticket {
  ticket_id: number;
  ticket_number: number;
  flight_id: number;
  passenger_id: number;
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketList: Ticket[] = [];
  headArray = [
    { Head: 'Ticket Number', FieldName: 'ticket_number' },
    { Head: 'Flight ID', FieldName: 'flight_id' },
    { Head: 'Passenger ID', FieldName: 'passenger_id' },
    { Head: 'Action', FieldName: '' }
  ];

  constructor(private http: HttpClient) { }

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
    console.log('Edit ticket:', item);
    // Implement edit logic
  }

  deleteTicket(item: Ticket) {
    console.log('Delete ticket:', item);
    // Implement delete logic
  }
}