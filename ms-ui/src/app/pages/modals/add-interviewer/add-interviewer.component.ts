import { Component, OnInit } from '@angular/core';
import { InterviewerService } from 'app/services/InterviewerService';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.scss']
})
export class AddInterviewerComponent implements OnInit {

  constructor(private interviewer:InterviewerService) { }

  ngOnInit() {
  }

  skills=["None","NodeJs","Python",".Net Core",".Net Framework","Angularjs","Angular","React","Vue"];
  departments=["None","AI","Web Apps","Mobile","Qa"];
  designations=["None","Manager","Associate 1","Consultant 2","Associate 2","Consultant 2"];


  addInterViewer(){
    var form=document.getElementById("addInterViewer");
    var obj={
      name:form[0].value,
      email:form[1].value,
      designation:form[2].value,
      department:form[3].value,
      skills:form[4].value,
      years_of_experience:form[5].value
    };
    this.interviewer.addInterviewer(obj).subscribe((res)=>{
      console.log(res);
    });
    


  }

}
