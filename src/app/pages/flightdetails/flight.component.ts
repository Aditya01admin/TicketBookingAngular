import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Flight {
  flightNo: string;
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
    { Head: 'Flight No', FieldName: 'flightNo' },
    { Head:'Capacity', FieldName:'capacity'},
    { Head: 'From', FieldName: 'fromStation' },
    { Head: 'FCode', FieldName:'fromCode'},
    { Head: 'To', FieldName: 'toStation' },
    { Head: 'DCode',FieldName:'toCode'},
    { Head: 'Departure', FieldName: 'departure' },
    { Head: 'Arrival', FieldName: 'arrival' },
    { Head: 'Price', FieldName: 'price' },
    { Head: 'Action', FieldName: '' }
  ];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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
    this.router.navigate(['/flightform', item.flightNo]);
  }

  deleteFlight(item: Flight) {
      if (confirm(`Are you sure you want to delete flights ${item.flightNo}?`)) {
        this.http.delete(`http://localhost:8082/flights/${item.flightNo}`).subscribe({
          next: () => {
            console.log('Flight deleted successfully');
            this.flightList = this.flightList.filter(p => p.flightNo !== item.flightNo);
          },
          error: (error) => {
            console.error('Error deleting flight:', error);
          }
        });
      }
  }
}
