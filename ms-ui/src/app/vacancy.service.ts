import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class VacancyService {
  apiUrl = "http://localhost:9000/";

  constructor(private http: HttpClient) {}

  vacancy() {
    return this.http.get(this.apiUrl + "admin/v1/vacancies");
  }
}
