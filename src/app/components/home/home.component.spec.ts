import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { SeatBookingService } from '../../services/seat-booking.service';
import { Bus } from '../../interfaces/bus';
import * as data from "../../../assets/buses.json";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ ReactiveFormsModule,
                  RouterTestingModule
                ],
      providers: [
        {provide: SeatBookingService, useClass: SeatBookingServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enforce source city validation',()=>{
    component.journeyInfo.controls['sourceLocation'].setValue('');
    expect(component.journeyInfo.controls['sourceLocation'].errors?.required).toBeTruthy();
  });

  it('should enforce Destination city validation',()=>{
    component.journeyInfo.controls['destination'].setValue('');
    expect(component.journeyInfo.controls['destination'].errors?.required).toBeTruthy();
  });

  it('should enforce valid date validation',()=>{
    component.journeyInfo.controls['departureDate'].setValue('');
    expect(component.journeyInfo.controls['departureDate'].errors?.required).toBeTruthy();
  });

  it('should enforce valid journey validation',()=>{
    component.journeyInfo.controls['sourceLocation'].setValue('Jaipur');
    component.journeyInfo.controls['destination'].setValue('Jaipur');
    expect(component.journeyInfo.controls['destination'].errors?.invalidJourney).toBeTruthy();
  });

  it('journey form should be valid on valid entries',()=>{
    component.journeyInfo.controls['sourceLocation'].setValue('Jaipur');
    component.journeyInfo.controls['destination'].setValue('Udaipur');
    component.journeyInfo.controls['departureDate'].setValue('21-05-18');
    expect(component.journeyInfo.invalid).toBeFalsy();
  });

  it('should navigate to availablebuses on valid submit',()=>{
    const router = TestBed.get(Router);
    spyOn(router,'navigateByUrl')
    const location = TestBed.get(Location);
    component.journeyInfo.controls['sourceLocation'].setValue('Jaipur');
    component.journeyInfo.controls['destination'].setValue('Udaipur');
    component.journeyInfo.controls['departureDate'].setValue('21-05-18');
    component.onSubmit();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/availablebuses']),{ skipLocationChange: false } )
      
  });
});

class SeatBookingServiceStub{
  buses: Bus[] = (data  as  any).default;
  getSourceCities(){
    return [...new Set(this.buses.map(bus=>bus.Source))]
  }

  getDestinationCities(){
    return [...new Set(this.buses.map(bus=>bus['Destination']))]
  }

  setJourneyEndpoints(){
  }
}
