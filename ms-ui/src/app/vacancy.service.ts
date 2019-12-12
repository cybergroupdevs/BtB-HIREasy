import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./services/commonService";
// import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class VacancyService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  vacancy() {
    return this.commonService.getData("admin/v1/vacancies");
  }
}
