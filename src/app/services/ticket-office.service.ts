import {Injectable} from '@angular/core';
import {Reservation} from "../interfaces/reservation";

@Injectable({
  providedIn: 'root'
})
export class TicketOfficeService {

  constructor() {
  }

  makeReservation(trainId: string, nbrSeats: number): Reservation {
    if(!trainId || !nbrSeats) {
      throw new Error('Invalid parameters');
    }

    return {
      train_id: '',
      booking_reference: '',
      seats: []
    };
  }
}
