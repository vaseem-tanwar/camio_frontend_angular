import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    status: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [ Validators.required]),
    role: new FormControl('' , [ Validators.required]),
    city: new FormControl('' , [ Validators.required]),
    country: new FormControl('' , [ Validators.required]),
  });
  role: any;
  submitStatus: boolean = false;
  constructor( 
    private auth: AuthService,
    public router: Router,
    public helper: HelperService,
    public toastr: ToastrService) {
    
   }

  ngOnInit(): void {
  }

  onRegister(){
    // this.router.navigate(['admin']);
    
    console.log(this.signupForm.value);
    if (this.signupForm.valid){
      if(this.signupForm.controls.firstname.value == '' || this.signupForm.controls.firstname.value == undefined){
        this.submitStatus = true;
      }
      else if(this.signupForm.controls.lastname.value == '' || this.signupForm.controls.lastname.value == undefined){
        this.submitStatus = true;
      }
      else if (this.signupForm.controls.email.value == '' || this.signupForm.controls.email.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      } else if (this.signupForm.controls.password.value == '' || this.signupForm.controls.password.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
       }  else if (this.signupForm.controls.role.value == '' || this.signupForm.controls.role.value == undefined) {
      // //   // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      } else if (this.signupForm.controls.status.value == '' || this.signupForm.controls.status.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      } else if (this.signupForm.controls.phone.value == '' || this.signupForm.controls.phone.value == undefined) {
        // this.toastr.error('Please select your driver licence', 'Error');
        this.submitStatus = true;
      } else if (this.signupForm.controls.city.value == '' || this.signupForm.controls.city.value == undefined){
        this.submitStatus = true;
      } else if (this.signupForm.controls.country.value == '' || this.signupForm.controls.country.value == undefined){
        this.submitStatus = true;
      }
      else {
        this.submitStatus = false;
        // this.auth
        this.auth.POSTMETHOD('admin/signup',
          this.signupForm.value).then((res: any) => {
          console.log(res);
          //console.log(res.response_data.accessToken);
          if (res.status==true) {

            // localStorage.setItem('accessToken', res.response_data.accessToken);
            // localStorage.setItem('user_id', res.response_data._id);
            //  localStorage.setItem('role', res.response_data.role);
            // localStorage.setItem('saah_user', JSON.stringify(res.response_data.userDetails));
            // localStorage.setItem('saah_user_email', res.data.email);
            // localStorage.setItem('saah_user_image', res.data.image);
            this.toastr.success(res.message, 'Success');
            // this.helper.successmsg(res.message);
            // if (res.response_data.role=='admin') {
            //   console.log("hello response");
              
            //   localStorage.setItem('firstname', res.response_data.firstname);
            //   localStorage.setItem('lastname', res.response_data.lastname);
            setTimeout(() => {
            this.router.navigate(['login']);
              
            }, 2000);  
          }
            // }else {
            //   localStorage.setItem('fullName', res.response_data.userDetails.fullName);
            //   this.router.navigate(['restaurant-owner']);
            // }
              else {
                this.toastr.error('Invalid entry')
          }
        }, error => {
          this.helper.successmsg('Invalid');
          // this.helper.printErrorMsg(error.error.error);
        });

      }

    } else {
      this.submitStatus = true;
    }

  }

  getVal(event:any){
    console.log(event);
    
    let text = event.target.options[event.target.options.selectedIndex].value;
    console.log(text);
    this.signupForm.controls.role.setValue(text);
  }

  getStatus(event:any){
    console.log(event);
    
    let text = event.target.options[event.target.options.selectedIndex].value;
    console.log(text);
    this.signupForm.controls.status.setValue(text);
  }

}
