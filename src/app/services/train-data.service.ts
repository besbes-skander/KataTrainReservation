import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainDataService {

  constructor(private http: HttpClient) {
  }

  getTrainData(trainId: string): Promise<any> {
    const url = 'localhost/train-data/' + trainId;
    return this.http.get(url).toPromise();
  }


}
