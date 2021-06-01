import {TestBed} from '@angular/core/testing';

import {TicketOfficeService} from './ticket-office.service';

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

  it('should throw error when trainId is empty', () => {
    const trainId = '';
    const nbrSeats = 3;

    expect(() => service.makeReservation(trainId, nbrSeats)).toThrow(new Error('Invalid parameters'));
  });

  it('should throw error when nbrSeats is 0', () => {
    const trainId = 'azec4542';
    const nbrSeats = 0;

    expect(() => service.makeReservation(trainId, nbrSeats)).toThrow(new Error('Invalid parameters'));
  });

  it('should return a Reservation object', () => {
    const trainId = 'azec4542';
    const nbrSeats = 2;

    const result = service.makeReservation(trainId, nbrSeats);

    expect(Object.keys(result)).toEqual(['train_id', 'booking_reference', 'seats']);
  });


});
