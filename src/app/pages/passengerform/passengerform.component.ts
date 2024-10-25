import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passenger',
  templateUrl: './passengerform.component.html',
  styleUrls: ['./passengerform.component.css']
})
export class PassengerformComponent implements OnInit {
  passengerForm!: FormGroup;
  isEditMode: boolean = false;
  passengerId: number | null = null;
  showSuccessPopup: boolean = false;


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
      this.passengerId = +params['id'];
      this.loadPassengerData(this.passengerId);
    }
  });

  this.passengerForm.get('passengerDob')?.valueChanges.subscribe(() => {
    this.calculateAge();
  });

}

  
  initForm(): void {
    this.passengerForm = this.fb.group({
      passengerId:['', Validators.required],
      passengerName: ['', Validators.required],
      passengerAge: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      passengerPhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,12}$/)]],
      passengerDob: ['', Validators.required]
    });
  }

  loadPassengerData(id: number): void {
    this.http.get(`http://localhost:8082/passengers/${id}`).subscribe({
      next: (data: any) => {
        
        this.passengerForm.patchValue({                  
          passengerId: data.passengerId,
          passengerName: data.passengerName,
          passengerAge: data.passengerAge,
          passengerPhoneNumber: data.passengerPhoneNumber,
          passengerDob: new Date(data.passengerDob).toISOString().split('T')[0] // Format date for input[type="date"]
        });
        this.passengerForm.get('passengerId')?.disable();             // Disable the passenger ID field in edit mode

      },
      error: (error) => {
        console.error('Error fetching passenger data:', error);
      }
    });
  }

  calculateAge(): void {
    const dob = this.passengerForm.get('passengerDob')?.value;
    if (dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.passengerForm.patchValue({ passengerAge: age });
    }
  }
  onSubmit(): void {
    if (this.passengerForm.valid) {
      const passengerData = this.passengerForm.value;
      passengerData.passengerDob = new Date(passengerData.passengerDob);

      const apiCall = this.isEditMode
        ? this.http.put(`http://localhost:8082/passengers/${this.passengerId}`, passengerData)
        : this.http.post('http://localhost:8082/passengers', passengerData);

      apiCall.subscribe({ 
        next: (response: any) => { 
          console.log(this.isEditMode ? 'Passenger updated successfully' : 'Passenger saved successfully', response);
          this.showSuccessPopup = true;

        },
        error: (error) => { 
          console.error(this.isEditMode ? 'Error updating passenger' : 'Error saving passenger', error);            
        }
      });
    }
  }

  onReset(): void {
    if (this.isEditMode) {
      this.loadPassengerData(this.passengerId!);
    } else {
      this.passengerForm.reset();
    }
  }

  onCancel(): void {
    this.router.navigate(['/passengers']);             // navigating  back to the passenger details)

  }
  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/passengers']);
  }
}