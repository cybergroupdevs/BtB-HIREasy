import { Component, OnInit } from '@angular/core';
import {VacancyService} from "app/services/vacancyService";
@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.scss']
})
export class AddVacancyComponent implements OnInit {

  constructor(private vacancyService:VacancyService) { }
  ngOnInit() {}
  
  locations=["None","Noida","Dallas"];
  qualifications=["None","B.Tech","M.Tech","Phd","Bsc","Msc"];
  certifications=["None","Salesforce-Admin","Salesforce-Platform","AWS-Solution Architect","Pluralsight"];
  skills=["None","NodeJs","Python",".Net Core",".Net Framework","Angularjs","Angular","React","Vue"];
  
  addVacancy(){
    let form=document.getElementById("createVacancy");
    var obj={
      jobTitle:form[0].value,
      canFresherApply:form[1].checked,
      jobLocation:form[2].value,
      qualifications: form[3].value,
      certifications: form[4].value,
      skills:form[5].value,
      minRequiredExperience:form[6].value,
      maxRequiredExperience:form[7].value
    };
    this.vacancyService.createVacancy(obj).subscribe((res)=>{
      console.log(res);
    });
    console.log(obj);
  }
  
}
