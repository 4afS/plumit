import { Component, OnInit } from '@angular/core';
import { GetWeightDataService } from './get-weight-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ GetWeightDataService ]
})

export class AppComponent implements OnInit {
  visitors: number;
  constructor(private getWeightData: GetWeightDataService) {}

  ngOnInit() {
    this.visitors = this.get_number_of_visitors();
  }

  get_number_of_visitors() {
    return this.getWeightData.number_of_visitors;
  }

  get_body_weight() {
    return this.getWeightData.body_weight;
  }
}
