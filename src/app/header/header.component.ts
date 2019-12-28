import {Component} from '@angular/core';
import {GetWeightDataService, JsonData} from 'src/app/get-weight-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  numberOfVisitors: number;
  ordinalSuffix: string;

  constructor(private weightDataService: GetWeightDataService) {
    this.weightDataService.jsonData$.subscribe((jsonData: JsonData) => {
      this.numberOfVisitors = jsonData.number_of_visitors;
      this.ordinalSuffix = this.ordinalSuffixOf(this.numberOfVisitors);
    });
  }

  private ordinalSuffixOf(n: number): string {
    switch (n % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
