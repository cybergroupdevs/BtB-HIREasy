import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
    var form=document.getElementById("LoginForm");
    if(form[0]=="" || form[1]=="")
    {
      
    }
    debugger;
    this.router.navigate(['/dashboard']);
  }
}
