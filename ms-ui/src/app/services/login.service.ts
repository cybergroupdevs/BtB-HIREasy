import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})

export class LoginService {
    constructor(private http: HttpClient){}
    apiUrl="http://localhost:9000/";
    addInterviewer(obj){
        return this.http.post(this.apiUrl+"admin/v1/interviewers",obj);
    };

    getInterviewers(){
        return this.http.get(this.apiUrl+"admin/v1/interviewers");
    }


    login(obj){
        return this.http.post(this.apiUrl+"admin/v1/login",obj);
    }
}