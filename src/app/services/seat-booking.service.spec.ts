import { TestBed } from '@angular/core/testing';

import { SeatBookingService } from './seat-booking.service';

describe('SeatBookingService', () => {
  let service: SeatBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});