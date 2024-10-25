import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Passenger {
  passengerId: number;
  passengerName: string;
  passengerAge: number;
  passengerPhoneNumber: string;
  passengerDob: string;
}

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  passengerList: Passenger[] = [];
  headArray = [
    {Head: 'ID', FieldName: 'passengerId'},
    { Head: 'Name', FieldName: 'passengerName' },
    { Head: 'Age', FieldName: 'passengerAge' },
    { Head: 'Phone Number', FieldName: 'passengerPhoneNumber' },
    { Head: 'Date of Birth', FieldName: 'passengerDob' },
    { Head: 'Action', FieldName: '' }
  ];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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
    this.router.navigate(['/passengerform', item.passengerId]);

  }
  deletePassenger(item: Passenger) {
    if (confirm(`Are you sure you want to delete passenger ${item.passengerId}?`)) {
      this.http.delete(`http://localhost:8082/passengers/${item.passengerId}`).subscribe({
        next: () => {
          console.log('Passenger deleted successfully');
          this.passengerList = this.passengerList.filter(p => p.passengerId !== item.passengerId);
        },
        error: (error) => {
          console.error('Error deleting passenger:', error);
        }
      });
    }
  }
}




