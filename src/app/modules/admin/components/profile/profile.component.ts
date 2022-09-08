import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  p: number = 1;
  list: any=[];
  details: any=[];
  viewdetail: any=[];
  delId: any;
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
    city: new FormControl('', [ Validators.required]),
    country: new FormControl('', [ Validators.required]),
    // confirm_password: new FormControl('', [ Validators.required]),
  });
  searchText: any = '';
  submitStatus: boolean = false;
  closeResult: any = '';
  userId: any = '';

 


  constructor( private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) { 
      this.userId = localStorage.getItem('user_id');
      this.getDetails(this.userId);
     }

  ngOnInit(): void {
  }

  getDetails(id: any){
    this.auth.POSTMETHOD('admin/'+id, {'userId': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      console.log(this.details.firstname);
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.firstname.setValue(this.details.firstname);
      this.applicantEditForm.controls.lastname.setValue(this.details.lastname);
      this.applicantEditForm.controls.phone.setValue(this.details.phone);
      this.applicantEditForm.controls.email.setValue(this.details.email);
      // this.applicantEditForm.controls.password.setValue(this.details.password);
      this.applicantEditForm.controls.city.setValue(this.details.city);
      this.applicantEditForm.controls.country.setValue(this.details.country);
      // this.applicantEditForm.controls.address.setValue(this.details[0].address);
      // this.applicantEditForm.controls.image.setValue(this.details[0].image);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateAdmins()  {
    try {
      console.log(this.applicantEditForm.controls.firstname.value);
      console.log(this.applicantEditForm.controls.lastname.value);
      console.log(this.applicantEditForm.controls.phone.value);
      console.log(this.applicantEditForm.controls._id.value);
      console.log(this.submitStatus);
      if (this.applicantEditForm.valid) {
        console.log("hello if");  
        
        this.submitStatus = false;
        if (this.applicantEditForm.controls.firstname.value == '' || this.applicantEditForm.controls.firstname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.lastname.value == '' || this.applicantEditForm.controls.lastname.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.phone.value == '' || this.applicantEditForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        // }else if (this.applicantEditForm.controls.address.value == '' || this.applicantEditForm.controls.address.value == undefined) {
        //   // this.toastr.error('Please select your back ground checking file', 'Error');
        //   this.submitStatus = true;
        }  else if (this.applicantEditForm.controls.password.value == '' || this.applicantEditForm.controls.password.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }
        else if (this.applicantEditForm.controls.city.value == '' || this.applicantEditForm.controls.city.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
         }else if (this.applicantEditForm.controls.country.value == '' || this.applicantEditForm.controls.country.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
          } else {
        console.log("hello else");
          
          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/'+this.applicantEditForm.controls._id.value+'/update',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.success == true) {
              this.toastr.success(res.message, 'Success');
              // this.reset();
              // this.getAdmins();
              // $("#EditFormModal").modal("hide");
            } else {
              this.toastr.error(res.message, 'Error');
            }
          }, error => {
            this.toastr.error(error['message'], 'Error');
          });
          // console.log(user);
        }
      } else {
        console.log("hello submit status");
        
        this.submitStatus = true;
      }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }


}
