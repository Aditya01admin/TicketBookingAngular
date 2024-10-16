import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-passenger',
  templateUrl: './passengerform.component.html',
  styleUrls: ['./passengerform.component.css']
})
export class PassengerformComponent implements OnInit {
  passengerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.passengerForm = this.fb.group({
      passenger_name: ['', Validators.required],
      passenger_age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      passenger_phone_number: ['', [Validators.required, Validators.pattern(/^\d{10,12}$/)]],
      passenger_dob: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.passengerForm.valid) {
      console.log(this.passengerForm.value);
      // Implement save logic here
    }
  }

  onReset(): void {
    this.passengerForm.reset();
  }

  onCancel(): void {
    // navigating  back to the passenger details)
    this.router.navigate(['/passengers']);
  }
}