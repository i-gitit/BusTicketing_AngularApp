import { Component, OnInit } from '@angular/core';
import {SeatBookingService } from '../../services/seat-booking.service';
import { Bus } from '../../interfaces/bus';
import { Location } from '@angular/common'

@Component({
  selector: 'app-available-buses',
  templateUrl: './available-buses.component.html',
  styleUrls: ['./available-buses.component.css']
})
export class AvailableBusesComponent implements OnInit {

  availableBuses:Bus[] | undefined = undefined;
  keys = ["Bus Name","Departure Time", "Coach Type","Seats Available","Fare"];
  constructor(private bookingService: SeatBookingService,
              private location: Location) { }

  ngOnInit(): void {
    this.availableBuses = this.bookingService.getFilteredBuses();
  }

  navigateBack(){
    this.location.back();
  }
}