import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { VacancyComponent } from "./vacancy/vacancy.component";
import { InterviewerComponent } from "./interviewer/interviewer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ChartsModule } from "ng2-charts";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VacancyComponent,
    InterviewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    ChartsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent, VacancyComponent]
})
export class AppModule {}
