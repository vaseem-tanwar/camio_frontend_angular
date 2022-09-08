import { AfterViewInit, ViewChild } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormControl, FormGroup, Validators,   } from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const $:any;
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  p: number = 1;
  list:any=[];      
  viewdetail: any=[];
  details:any={};
  search:any={};
  delId: any;
  splashId: any;
  submitStatus: boolean = false;
  charCodeArray:any=[];
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    headingtext: new FormControl('', [ Validators.required]),
    mainContent: new FormControl('', [ Validators.required]),
    // image: new FormControl('', [ Validators.required]),
    Date: new FormControl('', [ Validators.required]),
    // address: new FormControl('', [ Validators.required]),
   // phone: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });

  applicantForm = new FormGroup({
    headingtext: new FormControl('', [ Validators.required]),
    mainContent: new FormControl('', [ Validators.required]),
    image: new FormControl('', [ Validators.required]),
    Date: new FormControl('', [ Validators.required]),
    // password: new FormControl('', [ Validators.required]),
    // phone: new FormControl('', [ Validators.required]),
    // email: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.getTruck();
  }
  getTruck(){
    console.log('check')
    this.auth.GETMETHOD('admin/splash/splashList').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  changeStatus(isApproved:any, id: any){
    let st;
    if (isApproved == 'Active') {
      st = 'InActive';
    } else {
      st = 'Active';
    }
    this.auth.POSTMETHOD('admin/splash/status/'+id,{'status': st, '_id': id}).then((res: any) => {
      console.log(res);
     this.getTruck();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  reset() {
    this.applicantForm.reset();
    this.submitStatus = false;
  }


  
  async createApplicant() {
    try {
      if (this.applicantForm.value) {
        
        if (this.applicantForm.controls.headingtext.value == '' || this.applicantForm.controls.headingtext.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.mainContent.value == '' || this.applicantForm.controls.mainContent.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        }
        else if (this.applicantForm.controls.image.value == '' || this.applicantForm.controls.image.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        }
        else {

          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/splash/createSplash',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              $("#AddFormModal").modal("hide");
              this.reset();
              // this.getList();
              this.getTruck();
            } else {
              this.toastr.error(res.message, 'Error');
            }
          }, error => {
            this.toastr.error(error['message'], 'Error');
          });
          // console.log(user);
        }
      } else {
        this.submitStatus = true;
      }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Error!');
    }
  }

  viewDetails(detail: any){
    this.viewdetail=detail;
    console.log(this.viewdetail.name);
  }

  getDetails(id: any){
    this.auth.GETMETHOD('admin/splash/'+id).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.headingtext.setValue(this.details.headingtext);
      this.applicantEditForm.controls.mainContent.setValue(this.details.mainContent);
      // this.applicantEditForm.controls.image.setValue(this.details.image);
      this.applicantEditForm.controls.Date.setValue(this.details.Date);
      // this.applicantEditForm.controls.address.setValue(this.details[0].address);
      // this.applicantEditForm.controls.image.setValue(this.details[0].image);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  delVal(id: any){
    console.log(id, 'delval')
    this.delId = id;
  }

  deleteApplicant(){
    console.log(this.delId,'id');
    
    this.auth.POSTMETHOD('admin/splash/delete/'+this.delId, {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getTruck();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant()  {
    try {
      if (this.applicantEditForm.valid) {
        console.log("hello if"); 
        this.submitStatus = false;
        if (this.applicantEditForm.controls.headingtext.value == '' || this.applicantEditForm.controls.headingtext.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.mainContent.value == '' || this.applicantEditForm.controls.mainContent.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }
      
       else {
        console.log("hello else",this.applicantEditForm.controls._id);
          
          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/splash/update/'+this.applicantEditForm.controls._id.value,
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              $("#EditFormModal").modal("hide");
              this.getTruck();

              // $("#EditFormModal").modal("hide");
            } else {
              this.toastr.error(res.message);
            }
          }, error => {
            this.toastr.error(error['message'], 'Invalid values');
          });
          // console.log(user);
        }
      } else {
        
        console.log("forData---",this.applicantEditForm.controls.mainContent.value)
        this.submitStatus = true;
      }

    } catch (error: any) {
      console.log("hello submit status",error);
      this.toastr.error(error['message'], 'Invalid values');
    }
  }
    
    }

