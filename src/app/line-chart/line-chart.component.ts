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
  constructor(private weight_data: GetWeightDataService) {}

  context: CanvasRenderingContext2D;

  @ViewChild('maincanvas', {static: false})
  maincanvas: any;

  ngAfterViewInit() {
    this.context = this.maincanvas.nativeElement.getContext('2d');
    this.maincanvas = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.weight_data.dates,
        datasets: [{
          label: 'Weight',
          cubicInterpolationMode: 'monotone',
          backgroundColor: 'rgba(0,121,107 ,0.5)',
          borderColor: 'rgba(0,121,107 ,1)',
          data: this.weight_data.weights,
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
    return this.weight_data.number_of_visitors;
  }
}
