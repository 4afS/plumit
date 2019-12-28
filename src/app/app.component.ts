import {Component, OnInit} from '@angular/core';
import {GetWeightDataService, JsonData} from './get-weight-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetWeightDataService]
})

export class AppComponent implements OnInit {
  constructor(private weightDataService: GetWeightDataService) {}

  ngOnInit() {
    this.weightDataService.getWeightData().subscribe((jsonData: JsonData) => {
      this.weightDataService.setJsonData(jsonData);
    });
  }
}
