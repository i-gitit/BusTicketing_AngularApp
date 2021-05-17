import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvailableBusesComponent } from './available-buses.component';
import { By } from '@angular/platform-browser';
import { SeatBookingService } from '../../services/seat-booking.service';
import { Bus } from '../../interfaces/bus';
import * as data from "../../../assets/buses.json";

describe('AvailableBusesComponent', () => {
  let component: AvailableBusesComponent;
  let fixture: ComponentFixture<AvailableBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableBusesComponent ],
      providers: [
        {provide: SeatBookingService, useClass: SeatBookingServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when buses are unavailable', ()=>{
    component.availableBuses = [];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('h4'));
    expect(element.nativeElement.textContent).toContain('No buses are currently available');
  });
});

class SeatBookingServiceStub{
  buses: Bus[] = (data  as  any).default;
  getFilteredBuses(){
      return this.buses.filter((bus)=>{
        return (bus['Source'] == 'Jaipur' && bus['Destination'] == 'Udaipur');
      });
  }
}