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
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {
  p: number = 1;
  list:any=[];      
  viewdetail: any=[];
  details:any={};
  search:any={};
  delId: any;
  submitStatus: boolean = false;
  charCodeArray:any=[];
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    truckname: new FormControl('', [ Validators.required]),
    truckbrand: new FormControl('', [ Validators.required]),
    trucktype: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
    // address: new FormControl('', [ Validators.required]),
   // phone: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });

  applicantForm = new FormGroup({
    truckname: new FormControl('', [ Validators.required]),
    truckbrand: new FormControl('', [ Validators.required]),
    trucktype: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
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
    this.auth.GETMETHOD('admin/truck/trucksList').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/truck/'+id+'/truckIsactive',{'status': st, '_id': id}).then((res: any) => {
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
      

      if (this.applicantForm.valid) {
        this.submitStatus = false;
        if (this.applicantForm.controls.truckname.value == '' || this.applicantForm.controls.truckname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.truckbrand.value == '' || this.applicantForm.controls.truckbrand.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        }
        else if (this.applicantForm.controls.trucktype.value == '' || this.applicantForm.controls.trucktype.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        }
        else if (this.applicantForm.controls.description.value == '' || this.applicantForm.controls.description.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/truck/createtruck',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
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
    this.auth.POSTMETHOD('admin/truck/'+id+'/update', {'truckid': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      console.log(this.details.truckname);
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.truckname.setValue(this.details.truckname);
      this.applicantEditForm.controls.truckbrand.setValue(this.details.truckbrand);
      this.applicantEditForm.controls.trucktype.setValue(this.details.trucktype);
      this.applicantEditForm.controls.description.setValue(this.details.description);
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
    
    this.auth.POSTMETHOD('admin/truck/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
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
      console.log(this.applicantEditForm.controls.truckname.value);
      console.log(this.applicantEditForm.controls.description.value);
      console.log(this.applicantEditForm.controls._id.value);
      console.log(this.submitStatus);
      if (this.applicantEditForm.valid) {
        console.log("hello if");  
        
        this.submitStatus = false;
        if (this.applicantEditForm.controls.truckname.value == '' || this.applicantEditForm.controls.truckname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.truckbrand.value == '' || this.applicantEditForm.controls.truckbrand.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }
        else if (this.applicantEditForm.controls.trucktype.value == '' || this.applicantEditForm.controls.trucktype.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }
        else if (this.applicantEditForm.controls.description.value == '' || this.applicantEditForm.controls.description.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }else {
        console.log("hello else");
          
          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/truck/'+this.applicantEditForm.controls._id.value+'/update',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              // this.reset();
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
        console.log("hello submit status");
        
        this.submitStatus = true;
      }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Invalid values');
    }
  }
    
    }

