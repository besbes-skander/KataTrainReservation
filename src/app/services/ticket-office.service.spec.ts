import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TicketOfficeService} from './ticket-office.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TrainDataService} from "./train-data.service";

describe('TicketOfficeService', () => {
  let service: TicketOfficeService;
  let trainDataService: TrainDataService;
  let valueServiceSpy: jasmine.SpyObj<TrainDataService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    const spyTrainData = jasmine.createSpyObj<any>('TrainDataService', ['getTrainData']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: TrainDataService, useValue: spyTrainData}]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TicketOfficeService);
    valueServiceSpy = TestBed.inject(TrainDataService) as jasmine.SpyObj<TrainDataService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should accept a train_id and a number of seats', () => {
    const trainId = '1z5e4a';
    const nbrSeats = 3;
    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}
        }
    };

    valueServiceSpy.getTrainData.and.returnValue(Promise.resolve(mockTrainData));

    service.makeReservation(trainId, nbrSeats);

    expect(service.makeReservation(trainId, nbrSeats)).toBeTruthy();
  });

  it('should throw error when trainId is empty', () => {
    const trainId = '';
    const nbrSeats = 3;

    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}
        }
    };

    valueServiceSpy.getTrainData.and.returnValue(Promise.resolve(mockTrainData));

    service.makeReservation(trainId, nbrSeats).catch(error => {
      expect(error).toEqual(new Error('Invalid parameters'));
    });
  });

  it('should throw error when nbrSeats is 0', () => {
    const trainId = 'azec4542';
    const nbrSeats = 0;
    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}
        }
    };

    valueServiceSpy.getTrainData.and.returnValue(Promise.resolve(mockTrainData));

    service.makeReservation(trainId, nbrSeats).catch(error => {
      expect(error).toEqual(new Error('Invalid parameters'));
    });
  });

  it('should return a Reservation object', async () => {
    const trainId = 'azec4542';
    const nbrSeats = 2;

    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}
        }
    };

    valueServiceSpy.getTrainData.and.returnValue(Promise.resolve(mockTrainData));

    const result = await service.makeReservation(trainId, nbrSeats);

    expect(Object.keys(result)).toEqual(['train_id', 'booking_reference', 'seats']);
  });

  it('should call getTrainData once', () => {
    const trainId = 'unknown';
    const nbrSeats = 2;

    service.makeReservation(trainId, nbrSeats).catch(error => error);
    expect(valueServiceSpy.getTrainData.calls.count()).toBe(1, 'spy method was called once');
  });

  it('should throw error when trainId is unknown', () => {
    const trainId = 'unknown';
    const nbrSeats = 2;

    const mockTrainData: Object = [];

    valueServiceSpy.getTrainData.and.returnValue(Promise.resolve(mockTrainData));

    service.makeReservation(trainId, nbrSeats).catch(error => {
      expect(error).toEqual(new Error('Unknown train id'));
    })
  });

  it('should return true if train has more than 70% reservations', () => {

    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "aze", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "azea", "seat_number": "2", "coach": "A"}
        }
    };

    const result = service.trainHasMoreThan70PercentReservations(mockTrainData);

    expect(result).toBeTruthy();
  });

  it('should return false if train has less than 70% reservations', () => {

    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "aze", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}
        }
    };

    const result = service.trainHasMoreThan70PercentReservations(mockTrainData);

    expect(result).toBeFalse();
  });

  it('should return return coach B', () => {

    const nbrSeats = 3;
    const trainSeats = {
      "1A": {"booking_reference": "aze", "seat_number": "1", "coach": "A"},
      "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"},
      "2B": {"booking_reference": "", "seat_number": "2", "coach": "A"},
      "3A": {"booking_reference": "", "seat_number": "2", "coach": "B"},
      "4A": {"booking_reference": "", "seat_number": "2", "coach": "B"},
      "5A": {"booking_reference": "", "seat_number": "2", "coach": "B"},
      "6A": {"booking_reference": "", "seat_number": "2", "coach": "B"}
    };

    const result = service.getAvailableCoach(trainSeats, nbrSeats);

    expect(result).toEqual('B');
  });

});
