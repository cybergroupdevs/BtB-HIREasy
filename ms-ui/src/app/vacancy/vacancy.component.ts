import { Component, OnInit } from "@angular/core";

import { VacancyService } from "../vacancy.service";

@Component({
  selector: "app-vacancy",
  templateUrl: "./vacancy.component.html",
  styleUrls: ["./vacancy.component.css"]
})
export class VacancyComponent implements OnInit {
  chartOptions = {
    responsive: true
  };

  // chartData = [{ data: [], label: "Account A" }];

  chartData = [{ data: [] }];

  chartLabels = [];

  pieChartColors = [
    {
      backgroundColor: []
    }
  ];

  vacancyData = [];

  displayedColumns: string[] = [
    "Vacancy ID",
    "Title",
    "Description",
    "Freshers",
    "Skills"
  ];

  constructor(private VacancyService: VacancyService) {}

  ngOnInit() {
    this.vacany();
  }

  async vacany() {
    await this.VacancyService.vacancy().subscribe((data: any[]) => {
      this.vacancyData = data.data;
      console.log(this.vacancyData);
      this.addChartdata();
    });
  }

  async addChartdata() {
    await this.vacancyData.forEach(vacancyElement => {
      vacancyElement.skills.forEach(element => {
        this.chartLabels.push(element);
      });
    });
    console.log(this.chartLabels);
    console.log(this.chartData[0].data);
    this.sortChartdata(this.chartLabels);
  }

  sortChartdata(arr) {
    var a = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        this.chartData[0].data.push(1);
      } else {
        this.chartData[0].data[this.chartData[0].data.length - 1]++;
      }
      prev = arr[i];
    }

    const uniqueSet = new Set(this.chartLabels);
    this.chartLabels = [...uniqueSet];
    this.generateColors(this.chartLabels);
  }

  generateColors(labelArray) {
    labelArray.forEach(element => {
      this.pieChartColors[0].backgroundColor.push(
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
    });
  }
}
