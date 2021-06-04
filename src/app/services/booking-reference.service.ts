import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingReferenceService {

  constructor(private http: HttpClient) {
  }

  getBookingReference(): Promise<any> {
    const url = 'localhost/booking_reference';
    return this.http.get(url).toPromise();
  }
}
