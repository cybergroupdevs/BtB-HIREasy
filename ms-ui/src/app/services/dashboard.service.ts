import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: String = "http://localhost:8000/admin";

  constructor(private http: HttpClient) { }

  getDashboardData() {
    return this.http.get("http://localhost:8000/admin/v1/dashboard", {
      headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QudXNlcjkuYWRtaW5AdGVzdG1haWwuY29tIiwiaWF0IjoxNTc2MTQ0NzA2LCJleHAiOjE1NzYzMTc1MDZ9.qR2WmoHDRY-hgA1ikEUVvzV_XDUpGaZ-WHJps5TI7P8"
      }
    });
  };
}
