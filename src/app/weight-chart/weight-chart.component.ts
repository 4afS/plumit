import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {GetWeightDataService, JsonData, BodyWeight} from 'src/app/get-weight-data.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss']
})

export class WeightChartComponent implements AfterViewInit {
  weightDataSource = new Subject<BodyWeight[]>();

  constructor(private getWeightDataService: GetWeightDataService) {
    this.getWeightDataService.jsonData$.subscribe((jsonData: JsonData) => {
      this.weightDataSource.next(jsonData.body_weight);
    });
  }

  context: CanvasRenderingContext2D;

  @ViewChild('weightChart', {static: false})
  weightChart: any;

  ngAfterViewInit() {
    this.weightDataSource.asObservable().subscribe((weightData: BodyWeight[]) => {
      const dates = weightData.map(data => data.date);
      const weights = weightData.map(data => data.weight);
      this.context = this.weightChart.nativeElement.getContext('2d');
      this.weightChart = this.drawWeightChart(dates, weights);
    });
  }

  private drawWeightChart(dates: string[], weights: number[]) {
    return new Chart(this.context, {
      type: 'line',
      data: {
        labels: dates,
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
          data: weights,
          fill: true
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
          fontSize: 100,
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
              display: false,
            }
          }]
        }
      }
    });
  }
}
