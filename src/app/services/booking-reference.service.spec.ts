import { TestBed } from '@angular/core/testing';

import { BookingReferenceService } from './booking-reference.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('BookingReferenceService', () => {
  let service: BookingReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});

    service = TestBed.inject(BookingReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
