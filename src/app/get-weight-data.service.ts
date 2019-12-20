import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

class JsonData {
  number_of_visitors: number;
  body_weight: BodyWeight[] = [];
  constructor(n: number, b: BodyWeight[]) {
    this.number_of_visitors = n;
    this.body_weight = b;
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
  url: string = "http://osakainstituteof.tech/show/";
  // url: string = "http://localhost:3000/data";
  
  json_data: JsonData;

  constructor(private client: HttpClient) {
    this.client.get(this.url)
      .subscribe((result: JsonData) => {
        this.json_data = result;
      });
  }

  get number_of_visitors() {
    return this.json_data.number_of_visitors;
  }

  get body_weight() {
    return this.json_data.body_weight;
  }

  get dates() {
    return this.json_data.body_weight.map(data => data.date);
  }

  get weights() {
    return this.json_data.body_weight.map(date => date.weight);
  }
}

