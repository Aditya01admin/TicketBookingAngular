import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Flight {
  ID: number;
  FLIGHT_NO: string;
  CAPACITY: number;
  FROM_STATION: string;
  TO_STATION: string;
  FROM_CODE: string;
  TO_CODE: string;
  DEPARTURE: string;
  ARRIVAL: string;
  PRICE: number;
}

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  flightList: Flight[] = [];
  headArray = [
    { Head: 'Flight No', FieldName: 'FLIGHT_NO' },
    { Head: 'From', FieldName: 'FROM_STATION' },
    { Head: 'To', FieldName: 'TO_STATION' },
    { Head: 'Departure', FieldName: 'DEPARTURE' },
    { Head: 'Arrival', FieldName: 'ARRIVAL' },
    { Head: 'Price', FieldName: 'PRICE' },
    { Head: 'Action', FieldName: '' }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.http.get<Flight[]>('http://localhost:8082/flights').subscribe({
      next: (data) => {
        this.flightList = data;
      },
      error: (error) => {
        console.error('Error fetching flights:', error);
      }
    });
  }

  editFlight(item: Flight) {
    console.log('Edit flight:', item);
    // Implement edit logic
  }

  deleteFlight(item: Flight) {
    console.log('Delete flight:', item);
    // Implement delete logic
  }
}
