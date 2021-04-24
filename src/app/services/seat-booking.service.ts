import { Injectable } from '@angular/core';
import * as data from "../../assets/buses.json";
import { Bus } from '../interfaces/bus';
import { TicketGenerateService } from './ticket-generate.service';

@Injectable({
  providedIn: 'root'
})
export class SeatBookingService {

  journey: any;
  buses: Bus[] = (data  as  any).default;
  constructor(private ticketService: TicketGenerateService) {
  }

  getFilteredBuses(){
      if(this.journey){
        return this.buses.filter((bus)=>{
          return (bus['Source'] == this.journey.sourceLocation && bus['Destination'] == this.journey.destination);
        });
      }
      else
        return undefined;
  }

  getJourneyObject(){
    return this.journey;
  }

  getBusById(id:any){
      return this.buses.find((bus)=>{
          return bus.id == id;
      })
  }

  setJourneyEndpoints(journey:any){
      this.journey=journey;
  }
  
  setJourneyFare(busId:number,fare:number,selectedSeats:number[]){
    this.journey.fare = fare;
    this.journey.busId = busId;
    this.journey.selectedSeats = selectedSeats;
    console.log(this.journey);
  }

  setPassengerInfo(passenger:object){
    this.journey.passenger = passenger;
  }

  confirmBooking(){
    this.updateBusInfo();
    return this.ticketService.generateTicket(this.journey,this.getBusById(this.journey.busId));
  }

  updateBusInfo(){
    const busIndex = this.buses.findIndex(element => element.id == this.journey.busId )
    if(this.buses[busIndex].bookings[this.journey.departureDate])
        var bookedStatus = [...this.buses[busIndex].bookings[this.journey.departureDate]];
    else
        var bookedStatus = new Array(36).fill(false);
    for( var i of this.journey.selectedSeats){
      bookedStatus[i]=true;
    }
    this.buses[busIndex].bookings[this.journey.departureDate]=bookedStatus;
  }

  getSourceCities(){
    return [...new Set(this.buses.map(bus=>bus.Source))]
  }

  getDestinationCities(){
    return [...new Set(this.buses.map(bus=>bus['Destination']))]
  }
}