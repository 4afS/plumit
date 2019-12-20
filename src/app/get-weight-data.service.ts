import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

class JsonData {
  numberOfVisitors: number;
  bodyWeight: BodyWeight[] = [];
  constructor(n: number, b: BodyWeight[]) {
    this.numberOfVisitors = n;
    this.bodyWeight = b;
  }
}

class BodyWeight {
  date: string;
  weight: number;
  constructor(d: string, w: number) {
    this.date = d;
    this.weight = w;
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetWeightDataService {
  url = 'http://osakainstituteof.tech/show/';

  jsonData: JsonData;

  constructor(private client: HttpClient) {
    this.client.get(this.url)
      .subscribe((result: JsonData) => {
        this.jsonData = result;
      });
  }

  get number_of_visitors() {
    return this.jsonData.numberOfVisitors;
  }

  get body_weight() {
    return this.jsonData.bodyWeight;
  }

  get dates() {
    return this.jsonData.bodyWeight.map(data => data.date);
  }

  get weights() {
    return this.jsonData.bodyWeight.map(date => date.weight);
  }
}

