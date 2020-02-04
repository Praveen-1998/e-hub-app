import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Highcharts from 'highcharts';
import { BillableEmployeesService } from '../billable-employees.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Router } from '@angular/router';
import { PieChart } from '@amcharts/amcharts4/charts';
import { getLocaleDayNames } from '@angular/common';

@Component({
  selector: 'app-billable',
  templateUrl: './billable.component.html',
  styleUrls: ['./billable.component.css']
})

export class BillableComponent implements OnInit {
  constructor(private billableEmployeesService: BillableEmployeesService, private router: Router) {
    this.getBillableEmployeesCount();
    this.getBillableEmpExpCount();
  }
  highcharts = Highcharts;


  // chart1
  javacount: any = [];
  datasciencecount: any = [];
  dotnetcount: any = [];
  meanstackcount: any = [];
  zeroyearcount: any = [];
  oneyearcount: any = [];
  twoyearcount: any = [];
  threeyearcount: any = [];


  count: any = [];
  year: any = [];


  getBillableEmployeesCount() {
  //  let Name = [];
  //  this.billableEmployeesService.get(Name);
   const series = [];
   this.billableEmployeesService.getBillableEmployeesDetailsCount().subscribe(BillableEmployeesDetailsCount => {
      this.count = BillableEmployeesDetailsCount;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.count.length; i++) {
        series.push({
          name: this.count[i]._id.stack,
          y: this.count[i].count
        });
      }
      const chart =  Highcharts.chart('container1' , {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Technology Wise Billable Engineers',
          x: +20
        },
        legend: {
          shadow: false
        },
        tooltip: {
          pointFormat: '<b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            shadow: false,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          data: series,
          events: {
            click(e) {
             const name = e.point.name;
             console.log('Name   ' , name);
         }
        }
      }],
        credits: {
          enabled: false
        },
      });

    }, err => {
      console.log(err);
    }, () => {
      console.log('Count Came into DashBoard');
    });
  }




// chart2

  getBillableEmpExpCount() {
    const year = [];
    this.billableEmployeesService.getBillableEmployeesExpDetails().subscribe(ExpCount => {
      this.year = ExpCount;
      console.log(this.year);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.year.length; i++) {
        year.push({
          year: this.year[i]._id.yearOfExperience + 'years',
          y: this.year[i].count
        });
      }
      const chart =  Highcharts.chart( 'container2' , {
        chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
            },
        title: {
              text: 'Experience Wise  Billable Engineers',
              x: +15
               },
               tooltip: {
                pointFormat: '{series.data.year} {point.year}: {series.name}: <b>{point.y:.0f}</b>',
                shared: true
              },
        legend: {
          shadow: false
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.year}</b> ({point.y:,.0f}) ',
              style: {
                fontWeight: 'bold',
                color: 'black'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '150%'
          }
        },
        series : [
          {
            type: 'pie',
            name: 'Number of Employees',
            innerSize: '50%',
            data: year,
            events: {
              click:  (e) => {
                // name = e.point.name
                // console.log(e.point.year);
                  // window.location.href = './table_tech_billable.html'
              }
          }
        }
      ]
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log('Experience count came into DashBoard');
    });
  }

  ngOnInit() {
  }
}


