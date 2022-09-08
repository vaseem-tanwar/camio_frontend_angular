import { Component, OnInit, Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators, FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [ Validators.required]),
    // role: new FormControl('' , [ Validators.required]),
  });
  role: any;
  submitStatus: boolean = false;
  constructor(
    private auth: AuthService,
    public router: Router,
    public helper: HelperService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    let role = localStorage.getItem('role');
    if (token){
       if (role =='admin') {
       this.router.navigate(['admin']);
      }
      //else if (type == 'RESTAURANTOWNER') {
      //   this.router.navigate(['restaurant-owner']);
      // } else {}
    }
  }

  onSubmit(){
    // this.router.navigate(['admin']);
    
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid){
      if (this.loginForm.controls.email.value == '' || this.loginForm.controls.email.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      } else if (this.loginForm.controls.password.value == '' || this.loginForm.controls.password.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        console.log("password error");
        
        this.submitStatus = true;
       }
      //  else if (this.loginForm.controls.role.value == '' || this.loginForm.controls.role.value == undefined) {
      // //   // this.toastr.error('Please select your driver licence', 'Error');
      //    this.submitStatus = true;}
      else {
        this.submitStatus = false;
        // this.auth
        console.log("Form Data",this.loginForm.value);
        this.auth.POSTMETHOD('admin/login',
          this.loginForm.value).then((res: any) => {
          console.log(res);
          //console.log(res.response_data.accessToken);

          if(res.success==false){
            console.log("fail validation");
           // window.location.href="login"
            // window.confirm(res.message);
          this.toastr.error("Error: something went wrong");

            
           }  
          if (res.success==true && res.response_data.role == 'admin') {
            localStorage.setItem('accessToken', res.response_data.accessToken);
            localStorage.setItem('user_id', res.response_data._id);
             localStorage.setItem('role', res.response_data.role);
            // localStorage.setItem('saah_user', JSON.stringify(res.response_data.userDetails));
            // localStorage.setItem('saah_user_email', res.data.email);
            // localStorage.setItem('saah_user_image', res.data.image);
            this.toastr.success(res.message, 'Success');
            // this.helper.successmsg(res.message);
            if (res.response_data.role=='admin') {
              console.log("hello response");
              
              localStorage.setItem('firstname', res.response_data.firstname);
              localStorage.setItem('lastname', res.response_data.lastname);
              this.router.navigate(['admin']);
            }else{this.toastr.error('Access only for Admins');}
            // }else {
            //   localStorage.setItem('fullName', res.response_data.userDetails.fullName);
            //   this.router.navigate(['restaurant-owner']);
            // }
             }

           

        }, error => {
          this.helper.errorsmsg('Invalid');
          // this.helper.printErrorMsg(error.error.error);  
        });

      }

    } else {
      this.submitStatus = true;
    }

  }

  getVal($event: any){
    console.log($event);
    
    let text = $event.target.options[$event.target.options.selectedIndex].value;
    console.log(text);
    // this.loginForm.controls.role.setValue(text);
  }

}
