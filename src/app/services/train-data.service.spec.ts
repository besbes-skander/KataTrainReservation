import { TestBed } from '@angular/core/testing';

import { TrainDataService } from './train-data.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('TrainDataService', () => {
  let service: TrainDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TrainDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const mockTrainData = {
      "seats":
        {
          "1A": {"booking_reference": "", "seat_number": "1", "coach": "A"},
          "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}
        }
    };
    
    service.getTrainData('tfdhgv').then();

    const req = httpTestingController.expectOne('localhost/train-data/tfdhgv');

    expect(req.request.method).toEqual('GET');

    req.flush(mockTrainData);


  });
});
