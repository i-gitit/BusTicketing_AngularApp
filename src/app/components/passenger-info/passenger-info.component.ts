import { Component, OnInit } from '@angular/core';
import {SeatBookingService } from '../../services/seat-booking.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.css']
})

export class PassengerInfoComponent implements OnInit {
  passengerInfo: FormGroup = this.formBuilder.group({});
  submitted : boolean = false;
  journey: any;

  constructor(private formBuilder: FormBuilder,
    private bookingService: SeatBookingService,
    private router: Router) { }

  ngOnInit(): void {
    this.journey = this.bookingService.getJourneyObject();
    if(!this.journey){
      this.router.navigate(['']);
    }
    else{
    this.passengerInfo = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      mobilenumber: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      email: ['',[Validators.required, Validators.email]]
    });}
  }

  get formControl() {
    return this.passengerInfo.controls;
  }
  
  onFormSubmit() {
    this.submitted = true;
    if (this.passengerInfo.invalid)
        return;
    console.log(this.passengerInfo.value);
    this.bookingService.setPassengerInfo(this.passengerInfo.value);
    var ticketID = this.bookingService.confirmBooking();
    this.router.navigate(['/journeyDetails',ticketID]);
  }

}
