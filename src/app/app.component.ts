import {Component} from '@angular/core';
import {GetWeightDataService} from './get-weight-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetWeightDataService]
})

export class AppComponent {
  constructor() {}
}
