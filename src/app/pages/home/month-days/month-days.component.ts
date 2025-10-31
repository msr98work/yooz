import { Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-month-days',
  templateUrl: './month-days.component.html',
  styleUrls: ['./month-days.component.scss'],
  imports: [ChartComponent],
})
export class MonthDaysComponent {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: ChartOptions = {
    series: [
      {
        group: '28',
        name: 'هفته پنجم',
        data: this.generateData(3, {
          min: -30,
          max: 55,
        }),
      },
      {
        group: '21',
        name: 'هفته چهارم',
        data: this.generateData(7, {
          min: -30,
          max: 55,
        }),
      },
      {
        group: '14',
        name: 'هفته سوم',
        data: this.generateData(7, {
          min: -30,
          max: 55,
        }),
      },
      {
        group: '7',
        name: 'هفته دوم',
        data: this.generateData(7, {
          min: -30,
          max: 55,
        }),
      },
      {
        group: '0',
        name: 'هفته اول',
        data: this.generateData(7, {
          min: -30,
          max: 55,
        }),
      },
    ],
    chart: {
      type: 'heatmap',
      background: '#fff',
      parentHeightOffset: 0,
      offsetY: 2,
      fontFamily: 'vazir',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        radius: 5,
        shadeIntensity: 0.5,
        colorScale: {
          inverse: true,
          ranges: [
            {
              from: -30,
              to: 5,
              name: 'حضور',
              color: '#00A100',
            },
            {
              from: 6,
              to: 20,
              name: 'مرخصی',
              color: '#128FD9',
            },
            {
              from: 21,
              to: 45,
              name: 'ماموریت',
              color: '#FFB200',
            },
            {
              from: 46,
              to: 55,
              name: 'تعطیل',
              color: '#FF0000',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        return (
          opts.dataPointIndex +
          1 +
          +opts.w.config.series[opts.seriesIndex].group
        );
      },
    },
    title: {
      text: 'وضعیت روزهای کاری آبان ماه',
      align: 'center',
      offsetY: 8,
    },
  };

  constructor() {}

  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: '',
        y: y,
      });
      i++;
    }
    return series;
  }
}
