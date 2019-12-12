import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private toastr: ToastrService,private loginService:LoginService) { }

  ngOnInit() {
  }

  login(){
    var form=document.getElementById("LoginForm");
    if(form[0].value=="" || form[1].value=="")
    {
      this.toastr.warning(
        '<span data-notify="message">Invalid Credentials!</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center"
          }
        );
    } 
    else
    {
      this.loginService.login({email:form[0].value,password:form[0].value}).subscribe((res)=>{
        if(res["statusCode"]=="200")
        this.router.navigate(['/dashboard']);  
      });
      
    }
    
  }
}
