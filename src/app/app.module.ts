import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { SeatBookingService } from './services/seat-booking.service';
import { TicketGenerateService } from './services/ticket-generate.service';
import { SeatNamePipe } from './pipes/seatname.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AvailableBusesComponent } from './components/available-buses/available-buses.component';
import { SelectSeatsComponent } from './components/select-seats/select-seats.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { JourneySummaryComponent } from './components/journey-summary/journey-summary.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AvailableBusesComponent,
    SelectSeatsComponent,
    PassengerInfoComponent,
    JourneySummaryComponent,
    ViewTicketComponent,
    SeatNamePipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [SeatBookingService,TicketGenerateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
