import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface JsonData {
  number_of_visitors: number;
  body_weight: Array<BodyWeight>;
}

export interface BodyWeight {
  date: string;
  weight: number;
}

@Injectable({
  providedIn: 'root'
})

export class GetWeightDataService {
  private url = 'https://osakainstituteof.tech/show/';
  // private url = 'http://localhost:3000/data';

  constructor(private client: HttpClient) {}

  getWeightData(): Observable<JsonData> {
    return this.client.get<JsonData>(this.url);
  }
}

