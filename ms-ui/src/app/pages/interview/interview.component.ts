import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { InterviewerService } from 'app/services/InterviewerService';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'designation', 'department','skills','years_of_experience'];
  dataSource = new MatTableDataSource<Interviewer>();
  constructor(private interview:InterviewerService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.interview.getInterviewers().subscribe((res)=>{
      this.dataSource=res['data'];
    })
    this.dataSource.paginator = this.paginator;
  }

  
}

export interface Interviewer {
  name: string;
  email: string;
  designation: string;
  department: string;
  skills:[string];
  years_of_experience:number
}
