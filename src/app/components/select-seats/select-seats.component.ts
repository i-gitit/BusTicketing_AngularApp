import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bus } from 'src/app/interfaces/bus';
import { SeatBookingService } from '../../services/seat-booking.service';
import { FormControl, FormGroup, Validators, FormArray} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent implements OnInit {

  busId: any;
  busDetails : Bus | undefined;
  journey:any;
  seatStatus: boolean[] = new Array(36).fill(false);
  form:FormGroup = new FormGroup({
    seats:  new FormArray([])
  });
  selectedSeats: number[]=[];
  submitted: boolean = false;

  constructor(private route: ActivatedRoute,
    private bookingService: SeatBookingService,
    private router: Router) { }

  get seats() {
    return this.form.get('seats') as FormArray;
  }

  submit(){
    console.log(this.form);
    this.submitted=true;
    if(this.selectedSeats.length){
        //@ts-ignore
        var fare = this.busDetails['Fare'] * this.selectedSeats.length;
        this.bookingService.setJourneyFare(this.busId,fare,this.selectedSeats);
        this.router.navigate(['passengerInfo']);
    }
    else
      return;
  }

  ngOnInit(): void {
      this.journey=this.bookingService.getJourneyObject();
      if(typeof(this.journey)=='undefined')
          this.router.navigate(['']);
      else{
          this.route.paramMap.subscribe((params: ParamMap)=>{
              this.busId= params.get('id');
              this.busDetails = this.bookingService.getBusById(this.busId);
              if(!this.busDetails){
                  this.router.navigate(['']);
                  return;
              }
              var seatStatus = this.busDetails.bookings[this.journey.departureDate]
              if(seatStatus)
                  this.seatStatus = seatStatus;
          });
          this.seatStatus.forEach(() => {
              this.seats.push(new FormControl(false))
          });
          // @ts-ignore
          this.form.get('seats').valueChanges.subscribe(selectedValue => {
              this.selectedSeats=[];
              for(var i = 0; i < 36; i++){
                if(selectedValue[i])
                    this.selectedSeats.push(i);            
              }
        })
      }  
  };
}