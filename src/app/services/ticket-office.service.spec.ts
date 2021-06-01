import { TestBed } from '@angular/core/testing';

import { TicketOfficeService } from './ticket-office.service';

describe('TicketOfficeService', () => {
  let service: TicketOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should accept a train_id and a number of seats', () => {
    const trainId = '1z5e4a';
    const nbrSeats = 3;

    expect(service.makeReservation(trainId, nbrSeats)).toBeTruthy();
  });
});
