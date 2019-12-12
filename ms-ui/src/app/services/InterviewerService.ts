import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./commonService";

@Injectable({
  providedIn: "root"
})
export class InterviewerService {
  constructor(private http: HttpClient, private commonService: CommonService) {}
  addInterviewer(obj) {
    return this.commonService.create("admin/v1/interviewers", obj);
  }

  getInterviewers() {
    return this.commonService.getData("admin/v1/interviewers");
  }
}
