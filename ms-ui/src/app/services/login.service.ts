import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./commonService";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  login(obj) {
    return this.http.post(
      this.commonService.urlAddress + "/admin/v1/login",
      obj,
      this.commonService.generateHeaders(false)
    );
  }
}
