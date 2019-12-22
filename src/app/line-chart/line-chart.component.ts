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

  dates: string[];
  weights: number[];

  ngAfterViewInit() {
    this.getWeightDataService.getWeightData().subscribe((jsonData: JsonData) => {
      const weightData: BodyWeight[] = jsonData.body_weight;
      this.dates = weightData.map(data => data.date);
      this.weights = weightData.map(data => data.weight);
      this.context = this.weightChart.nativeElement.getContext('2d');
      this.weightChart = this.drawWeightChart();
    });
  }

  private drawWeightChart() {
    return new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [{
          label: 'Weight',
          lineTension: 0,
          pointRadius: 7,
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          spanGaps: true,
          cubicInterpolationMode: 'monotone',
          backgroundColor: 'rgba(0,121,107 ,0.5)',
          borderColor: 'rgba(0,121,107 ,1)',
          data: this.weights,
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
  }
}
