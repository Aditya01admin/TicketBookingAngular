import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticketform.component.html',
  styleUrls: ['./ticketform.component.css']
})
export class TicketformComponent implements OnInit {
  ticketForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.ticketForm = this.fb.group({
      ticket_number: ['', Validators.required],
      flight_id: ['', Validators.required],
      passenger_id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      console.log(this.ticketForm.value);
      // Implement save logic here
    }
  }

  onReset(): void {
    this.ticketForm.reset();
  }

  onCancel(): void {
    // Implement cancel logic here (e.g., navigate back)
  }
}
