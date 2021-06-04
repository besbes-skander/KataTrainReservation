import {Injectable} from '@angular/core';
import {Reservation} from "../interfaces/reservation";
import {TrainDataService} from "./train-data.service";
import {BookingReferenceService} from "./booking-reference.service";
import {UtilsService} from "../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class TicketOfficeService {

  constructor(public trainDataService: TrainDataService,
              public bookingReferenceService: BookingReferenceService,
              private utils : UtilsService) {
  }

  async makeReservation(trainId: string, nbrSeats: number): Promise<Reservation> {
    let bookingReference = '';
    let reservedSeats: string[] = [];

    if (!trainId || !nbrSeats) {
      throw new Error('Invalid parameters');
    }

    const trainData = await this.trainDataService.getTrainData(trainId);

    if (!trainData || trainData.length === 0) {
      throw new Error('Unknown train id');
    }

    if (this.trainHasMoreThan70PercentReservations(trainData, nbrSeats)) {
      return {
        train_id: trainId,
        booking_reference: '',
        seats: []
      };
    }

    const availableCoach = this.getAvailableCoach(trainData.seats, nbrSeats);

    if (availableCoach) {
      reservedSeats = this.getReservedSeats(trainData.seats, availableCoach, nbrSeats);

      if (reservedSeats.length) {
        bookingReference = await this.bookingReferenceService.getBookingReference();
      }
    }


    return {
      train_id: trainId,
      booking_reference: bookingReference,
      seats: reservedSeats
    };
  }

  trainHasMoreThan70PercentReservations(trainData: any, nbrSeats: number): boolean {
    const reservedSeats = Object.values(trainData.seats).filter((seat: any) => seat.booking_reference !== '').length;
    const numberOfSeats = Object.values(trainData.seats).length;

    return ((reservedSeats + nbrSeats) / numberOfSeats) > 0.7;
  }

  getAvailableCoach(trainSeats: any, nbrSeats: number): string {
    let seatsByCoach = this.utils.groupBy(Object.values(trainSeats), 'coach');

    const availableCoaches = Object.keys(seatsByCoach).filter((coach: any) => {
      const reservedSeats = seatsByCoach[coach].filter((seat: any) => seat.booking_reference !== '').length;
      const totalSeats = seatsByCoach[coach].length;
      return (reservedSeats / totalSeats) < 0.7 && (reservedSeats + nbrSeats) <= totalSeats
    });

    return availableCoaches[0];
  }


  private getReservedSeats(seats: any, availableCoach: string, nbrSeats: number): string[]{
    let reservedSeats = [];
    let seatsByCoach = this.utils.groupBy(Object.values(seats), 'coach');

    for (let i = 0; i < nbrSeats; i++) {
      reservedSeats.push(seatsByCoach[availableCoach][i]['seat_number'] + availableCoach);
    }

    return reservedSeats;
  }
}
