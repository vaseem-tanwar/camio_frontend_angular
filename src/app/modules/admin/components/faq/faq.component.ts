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
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
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
    Question: new FormControl('', [ Validators.required]),
    answer: new FormControl('', [ Validators.required]),
  });

  applicantForm = new FormGroup({
    Question: new FormControl('', [ Validators.required]),
    answer: new FormControl('', [ Validators.required]),

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
    this.auth.GETMETHOD('admin/faq/faqesList').then((res: any) => {
      console.log(res);
     this.list = res.data;
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
    this.auth.POSTMETHOD('admin/faq/status/'+id,{'status': st, '_id': id}).then((res: any) => {
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
        
        if (this.applicantForm.controls.Question.value == '' || this.applicantForm.controls.Question.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.answer.value == '' || this.applicantForm.controls.answer.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        }
        else {

          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/faq/createfaq',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              $("#AddFormModal").modal("hide");
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
    this.auth.GETMETHOD('admin/faq/'+id).then((res: any) => {
      console.log(res);
      this.details = res.data;
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.Question.setValue(this.details.Question);
      this.applicantEditForm.controls.answer.setValue(this.details.answer);
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
    
    this.auth.POSTMETHOD('admin/faq/delete/'+this.delId, {_id: this.delId}).then((res: any) => {
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
        if (this.applicantEditForm.controls.Question.value == '' || this.applicantEditForm.controls.Question.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.answer.value == '' || this.applicantEditForm.controls.answer.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }
       else {
        console.log("hello else",this.applicantEditForm.controls._id);
          
          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/faq/update/'+this.applicantEditForm.controls._id.value,
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.getTruck();
              

               $("#EditFormModal").modal("hide");
            } else {
              this.toastr.error(res.message);
            }
          }, error => {
            this.toastr.error(error['message'], 'Invalid values');
          });
          // console.log(user);
        }
      } else {
        
        console.log("forData---",this.applicantEditForm.controls.answer.value)
        this.submitStatus = true;
      }

    } catch (error: any) {
      console.log("hello submit status",error);
      this.toastr.error(error['message'], 'Invalid values');
    }
  }
    
    }


