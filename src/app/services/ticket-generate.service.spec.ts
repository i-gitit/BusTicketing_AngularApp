import { TestBed } from '@angular/core/testing';

import { TicketGenerateService } from './ticket-generate.service';

describe('TicketGenerateService', () => {
  let service: TicketGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
