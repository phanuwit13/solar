import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as firebase from "firebase";
import { snapshotToArray } from "../../environments/environment";
// import * as chart from 'chart.js'
// import { Chart } from 'chart.js'
import { Chart } from "chart.js";
// import {
//   Chart,
//   ArcElement,
//   LineElement,
//   BarElement,
//   PointElement,
//   BarController,
//   BubbleController,
//   DoughnutController,
//   LineController,
//   PieController,
//   PolarAreaController,
//   RadarController,
//   ScatterController,
//   CategoryScale,
//   LinearScale,
//   LogarithmicScale,
//   RadialLinearScale,
//   TimeScale,
//   TimeSeriesScale,
//   Filler,
//   Legend,
//   Title,
//   Tooltip,
// } from 'chart.js'
// Chart.register(
//   ArcElement,
//   LineElement,
//   BarElement,
//   PointElement,
//   BarController,
//   BubbleController,
//   DoughnutController,
//   LineController,
//   PieController,
//   PolarAreaController,
//   RadarController,
//   ScatterController,
//   CategoryScale,
//   LinearScale,
//   LogarithmicScale,
//   RadialLinearScale,
//   TimeScale,
//   TimeSeriesScale,
//   Filler,
//   Legend,
//   Title,
//   Tooltip
// )
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  //@ViewChild('barCanvas') barCanvas: ElementRef
  @ViewChild("barcanvas", { static: true }) barcanvas: any;
  @ViewChild("barcanvas2", { static: true }) barcanvas2: any;
  //@ViewChild('barCanvas2') barCanvas2: ElementRef
  // Chart.register(...registerables);
  // @ViewChild('barCanvas') barCanvas
  // @ViewChild('barCanvas2') barCanvas2

  barChart: any;
  barChart2: any;
  daynum = [];
  item: any;
  day: Array<any> = [];
  dateShow: any;
  dataShow: Array<any> = [];
  pointVB: Array<any> = [];
  pointVS: Array<any> = [];
  pointCB: Array<any> = [];
  pointCS: Array<any> = [];
  ref = firebase.database().ref("/");
  async ngOnInit() {
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        this.daynum.push("0" + i + ":00");
      } else {
        this.daynum.push(i + ":00");
      }
      //his.daynum.push(i )
    }
    this.ref.on("value", (resp) => {
      this.item = snapshotToArray(resp);
      this.day = this.item[0].log.split("z");
      this.day.pop();
      for (let i = 0; i < this.day.length; i++) {
        this.day[i] = this.day[i].split(",");
      }
      console.log(this.day);
    });
    this.chart();
    this.chart2();
  }
  constructor() {}
  chart() {
    this.barChart = new Chart(this.barcanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.daynum,
        datasets: [
          {
            label: "VB",
            data: this.pointVB,
            fill: false,
            borderColor: ["rgb(75, 192, 192)"],
            borderWidth: 2,
          },
          {
            label: "CB",
            data: this.pointCB,
            fill: false,
            borderColor: ["rgba(45,209,62,1)"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  chart2() {
    this.barChart2 = new Chart(this.barcanvas2.nativeElement, {
      type: "line",
      data: {
        labels: this.daynum,
        datasets: [
          {
            label: "VS",
            data: this.pointVS,
            fill: false,
            borderColor: ["rgba(255,99,132,1)"],
            borderWidth: 2,
          },
          {
            label: "CS",
            data: this.pointCS,
            fill: false,
            borderColor: ["rgba(238,147,44,1)"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  dateSet = (e) => {
    this.pointVB = [];
    this.pointVS = [];
    this.pointCB = [];
    this.pointCS = [];
    var today = e.target.value.split("-");
    this.dateShow = today[2] + "-" + today[1] + "-" + today[0];
    console.log(this.dateShow);
    this.dataShow = this.day.filter((value) => {
      return value[0].substring(5) == this.dateShow;
    });
    for (let i = 0; i < 24; i++) {
      let vb: number = 0;
      let vs: number = 0;
      let cb: number = 0;
      let cs: number = 0;
      let n: number = 0;
      this.dataShow.forEach((value) => {
        if (parseInt(value[1].substring(5, 7)) === i) {
          // console.log(value[1].substring(5, 7))
          n++;
          vb += parseFloat(value[2].substring(3));
          vs += parseFloat(value[3].substring(3));
          cb += parseFloat(value[4].substring(3));
          cs += parseFloat(value[5].substring(3));
        }
      });
      this.pointVB.push(vb / 4);
      this.pointVS.push(vs / 4);
      this.pointCB.push(cb / 4);
      this.pointCS.push(cs / 4);
    }
    this.barChart.destroy();
    this.barChart2.destroy();
    this.chart();
    this.chart2();
  };
}
