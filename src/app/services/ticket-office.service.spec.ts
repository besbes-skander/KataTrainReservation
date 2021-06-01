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

  it('should throw error when no argument passed', () => {
    expect(() => service.makeReservation()).toThrow(new Error('Invalid parameters'));
  });
});
