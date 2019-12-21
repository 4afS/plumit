import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {GetWeightDataService, JsonData, BodyWeight} from 'src/app/get-weight-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [GetWeightDataService]
})
export class LineChartComponent implements AfterViewInit {
  constructor(private getWeightDataService: GetWeightDataService) {}

  context: CanvasRenderingContext2D;

  @ViewChild('weightChart', {static: false})
  weightChart: any;

  ngAfterViewInit() {
    this.getWeightDataService.getWeightData().subscribe((jsonData: JsonData) => {
      const weightData: Array<BodyWeight> = jsonData.body_weight;
      const dates = weightData.map(data => data.date);
      const weights = weightData.map(data => data.weight);
      this.context = this.weightChart.nativeElement.getContext('2d');
      this.weightChart = new Chart(this.context, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Weight',
            cubicInterpolationMode: 'monotone',
            backgroundColor: 'rgba(0,121,107 ,0.5)',
            borderColor: 'rgba(0,121,107 ,1)',
            data: weights,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          title: {
            fontStyle: 'bold',
            fontSize: 60
          },
          scales: {
            xAxes: [{
              type: 'category',
              position: 'button',
              scaleLabel: {
                labelString: 'Date',
                display: false,
              }
            }],
            yAxes: [{
              type: 'linear',
              scaleLabel: {
                labelString: 'Weight',
                display: false
              }
            }]
          }
        }
      });
    });
  }
}
