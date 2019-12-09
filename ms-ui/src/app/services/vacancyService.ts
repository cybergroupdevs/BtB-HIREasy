import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})

export class VacancyService {
    constructor(private http: HttpClient){}
    apiUrl="http://localhost:9000/";
    createVacancy(obj){
        return this.http.post(this.apiUrl+"admin/v1/vacancies",obj);
    };

    getVacancies(){
        return this.http.get(this.apiUrl+"admin/v1/vacancies");
    }

}