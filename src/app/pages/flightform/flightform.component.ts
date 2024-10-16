import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flightform',
  templateUrl: './flightform.component.html',
  styleUrls: ['./flightform.component.css']
})
export class FlightformComponent implements OnInit {
  flightForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.flightForm = this.fb.group({
      flightNo: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      fromStation: ['', Validators.required],
      toStation: ['', Validators.required],
      fromCode: [''],
      toCode: [''],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const flightData = this.flightForm.value;
      
      flightData.departure = new Date(flightData.departure);
      flightData.arrival = new Date(flightData.arrival);

      this.http.post('http://localhost:8080/flights', flightData)
      .subscribe({ 
        next: (response: any) => { 
          console.log('Flight saved successfully', response);
          this.router.navigate(['/flights']);
        },
        error: (error) => { 
          console.error('Error saving flight', error);            
        }
      });
    }
  }

  onReset(): void {
    this.flightForm.reset();
  }

  onCancel(): void {
    // Yoo navigate back to the flight list
    this.router.navigate(['/flights']);
  }
}