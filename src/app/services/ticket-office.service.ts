import {Injectable} from '@angular/core';
import {Reservation} from "../interfaces/reservation";
import {TrainDataService} from "./train-data.service";

@Injectable({
  providedIn: 'root'
})
export class TicketOfficeService {

  constructor(public trainDataService: TrainDataService) {
  }

  async makeReservation(trainId: string, nbrSeats: number): Promise<Reservation> {
    if (!trainId || !nbrSeats) {
      throw new Error('Invalid parameters');
    }

    const trainData = await this.trainDataService.getTrainData(trainId);

    if (!trainData || trainData.length === 0) {
      throw new Error('Unknown train id');
    }

    return {
      train_id: '',
      booking_reference: '',
      seats: []
    };
  }
}
