import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketOfficeService {

  constructor() { }

  makeReservation() {
    throw new Error('Invalid parameters');
  }
}
