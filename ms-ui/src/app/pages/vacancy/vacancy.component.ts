import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {VacancyService } from 'app/services/vacancyService';
 
@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})

export class VacancyComponent implements OnInit {
  displayedColumns: string[] = ['jobLocation', 'jobTitle', 'skills', 'qualifications','certifications'];
  dataSource = new MatTableDataSource<Vacancy>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private vacancyService:VacancyService) { }

  ngOnInit() {
    this.vacancyService.getVacancies().subscribe((res)=>{
      console.log(res);
      this.dataSource=res['data'];
    });
    this.dataSource.paginator = this.paginator;
  }
}

export interface Vacancy {
  jobLocation: string;
  qualifications: [];
  minimumExperienceRequired: string;
  CanFresherApply: string;
  Skills:[];
  certifications:[];
  jobTitle:string;
}