import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketOfficeService {

  constructor() {
  }

  makeReservation(trainId: string, nbrSeats: number) {
    if(!trainId) {
      throw new Error('Invalid parameters');
    }

    return true;
  }
}
