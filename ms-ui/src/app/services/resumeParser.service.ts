import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResumeParserService {
  constructor(private http: HttpClient) { }

  startResumeParsing() {
    return this.http.get("http://localhost:8080/parseResumes");
  };
}
