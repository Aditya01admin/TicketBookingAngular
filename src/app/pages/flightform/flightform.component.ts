import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flightform',
  templateUrl: './flightform.component.html',
  styleUrls: ['./flightform.component.css']
})
export class FlightformComponent implements OnInit {
  flightForm!: FormGroup;
  isEditMode: boolean = false;
  flightNo: number | null = null;

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
        this.flightNo = +params['id'];
        this.loadFlightData(this.flightNo);
      }
    });
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

  formatDateTime(dateString: string): string | null {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`; // Format as YYYY-MM-DDTHH:mm
  }

  loadFlightData(id: number): void {
    this.http.get(`http://localhost:8082/flights/${id}`).subscribe({
      next: (data: any) => {
        this.flightForm.patchValue({
          flightNo: data.flightNo,
          capacity: data.capacity,
          fromStation: data.fromStation,
          toStation: data.toStation,
          fromCode: data.fromCode,
          toCode: data.toCode,
          departure: this.formatDateTime(data.departure), // Use the new format function
          arrival: this.formatDateTime(data.arrival),     // Use the new format function
          price: data.price,
        });
        // this.flightForm.get('flightNo')?.disable(); // Disable the flight No field in edit mode
      },
      error: (error) => {
        console.error('Error fetching flight data:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const flightData = this.flightForm.value;
      flightData.departure=new Date(flightData.departure);
      flightData.arrival=new Date(flightData.arrival);


      const apiCall = this.isEditMode
        ? this.http.put(`http://localhost:8082/flights/${this.flightNo}`, flightData)
        : this.http.post('http://localhost:8082/flights', flightData);

      apiCall.subscribe({
        next: (response: any) => {
          console.log(this.isEditMode?'Flight updated sucessfully':'Flight saved successfully', response);
          this.router.navigate(['/flights']);
        },
        error: (error) => {
          console.error(this.isEditMode?'Error updating the flight':'Error saving flight', error);
        }
      });
    }
  }

  onReset(): void {
    if (this.isEditMode) {
      this.loadFlightData(this.flightNo!);
    } else {
      this.flightForm.reset();
    }
  }

  onCancel(): void {
    this.router.navigate(['/flights']);
  }
}
