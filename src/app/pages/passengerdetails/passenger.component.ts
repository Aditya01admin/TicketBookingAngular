import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Passenger {
  passenger_id: number;
  passenger_name: string;
  passenger_age: number;
  passenger_phone_number: string;
  passenger_dob: string;
}

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  passengerList: Passenger[] = [];
  headArray = [
    { Head: 'Name', FieldName: 'passenger_name' },
    { Head: 'Age', FieldName: 'passenger_age' },
    { Head: 'Phone Number', FieldName: 'passenger_phone_number' },
    { Head: 'Date of Birth', FieldName: 'passenger_dob' },
    { Head: 'Action', FieldName: '' }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPassengers();
  }

  loadPassengers() {
    this.http.get<Passenger[]>('http://localhost:8082/passengers').subscribe({
      next: (data) => {
        this.passengerList = data;
      },
      error: (error) => {
        console.error('Error fetching passengers:', error);
      }
    });
  }

  editPassenger(item: Passenger) {
    console.log('Edit passenger:', item);
    // Implement edit logic
  }

  deletePassenger(item: Passenger) {
    console.log('Delete passenger:', item);
    // Implement delete logic
  }
}