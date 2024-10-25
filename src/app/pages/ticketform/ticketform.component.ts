import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticketform.component.html',
  styleUrls: ['./ticketform.component.css']
})
export class TicketformComponent implements OnInit {
  ticketForm!: FormGroup;
  isEditMode: boolean = false;
  ticketId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.ticketId = Number(params['id']);
        this.loadticketdata(this.ticketId);
        // setTimeout(() => this.loadticketdata(this.ticketId), 0);

      }
    });
  }

  initForm(): void {
    this.ticketForm = this.fb.group({
      ticket_number: ['', Validators.required],
      flightNo: [''],
      passengerId: ['']
    });
  }

  loadticketdata(id: number): void {
    this.http.get(`http://localhost:8082/tickets/${id}`).subscribe({
      next: (data: any) => {
        console.log('Fetched ticket data:', data);
        this.ticketForm.patchValue({
          ticket_number: data.ticketNumber,
          flightNo: data.flight.flightNo,
          passengerId: data.passengers[0]?.passengerId,
        });
        // this.ticketForm.get('ticket_number')?.disable();
      },
      error: (error) => {
        console.error('Error fetching the Ticket data', error);
      }
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const ticketData ={

      ticketNumber: this.ticketForm.value.ticket_number, 
      flight: {
        flightNo: this.ticketForm.value.flightNo 
      },
      passengers: [
        {
          passengerId: this.ticketForm.value.passengerId 
        }
      ]
    };

      const apiCall = this.isEditMode
        ? this.http.put(`http://localhost:8082/tickets/${this.ticketId}`, ticketData)
        : this.http.post('http://localhost:8082/tickets', ticketData);
      
      apiCall.subscribe({ 
        next: (response: any) => { 
          console.log(this.isEditMode ? 'Ticket Updated Successfully' : 'Ticket saved successfully', response);
          this.router.navigate(['/tickets']);
        },
        error: (error) => { 
          console.error(this.isEditMode ? 'Error Updating the Ticket' : 'Error saving ticket', error);            
        }
      });
    }
  }

  onReset(): void {
    if (this.isEditMode) {
      this.loadticketdata(this.ticketId!);
    } else {
      this.ticketForm.reset();
    }
  }

  onCancel(): void {
    this.router.navigate(['/tickets']);
  }
}
