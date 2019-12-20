import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {GetWeightDataService} from 'src/app/get-weight-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [GetWeightDataService]
})
export class LineChartComponent implements AfterViewInit {
  constructor(private getWeightData: GetWeightDataService) {}

  context: CanvasRenderingContext2D;

  @ViewChild('maincanvas', {static: false})
  maincanvas: any;

  ngAfterViewInit() {
    this.context = this.maincanvas.nativeElement.getContext('2d');
    this.maincanvas = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.getWeightData.dates,
        datasets: [{
          label: 'Weight',
          cubicInterpolationMode: 'monotone',
          backgroundColor: 'rgba(0,121,107 ,0.5)',
          borderColor: 'rgba(0,121,107 ,1)',
          data: this.getWeightData.weights,
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
  get number() {
    return this.getWeightData.number_of_visitors;
  }
}
