import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormControl, FormGroup, Validators,   } from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit {
  p: number = 1;
  list:any=[];      
  viewdetail: any=[];
  details:any={};
  search:any={};
  delId: any;
  submitStatus: boolean = false;

  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    taxname: new FormControl('', [ Validators.required]),
    taxrate: new FormControl('', [ Validators.required]),
    // address: new FormControl('', [ Validators.required]),
   // phone: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });

  applicantForm = new FormGroup({
    taxname: new FormControl('', [ Validators.required]),
    taxrate: new FormControl('', [ Validators.required]),
    // password: new FormControl('', [ Validators.required]),
    // phone: new FormControl('', [ Validators.required]),
    // email: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });

  constructor(
    private location: Location,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getTaxes();
  }

  getTaxes(){
    console.log('check')
    this.auth.GETMETHOD('admin/tax/taxesList').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


  changeTaxStatus(isApproved:any, id: any){
    let st;
    if (isApproved == 'Active') {
      st = 'InActive';
    } else {
      st = 'Active';
    }
    this.auth.POSTMETHOD('admin/tax/'+id+'/taxIsactive',{'status': st, '_id': id}).then((res: any) => {
      console.log(res);
     this.getTaxes();
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
        if (this.applicantForm.controls.taxname.value == '' || this.applicantForm.controls.taxname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.taxrate.value == '' || this.applicantForm.controls.taxrate.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else {

          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/tax/createTax',
            this.applicantForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
              this.getTaxes();
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
    this.auth.POSTMETHOD('admin/tax/'+id, {'taxId': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      console.log(this.details.taxname);
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.taxname.setValue(this.details.taxname);
      this.applicantEditForm.controls.taxrate.setValue(this.details.taxrate);
      // this.applicantEditForm.controls.address.setValue(this.details[0].address);
      // this.applicantEditForm.controls.image.setValue(this.details[0].image);
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  delVal(id: any){
    this.delId = id;
  }

  deleteApplicant(){
    console.log(this.delId,'id');
    
    this.auth.POSTMETHOD('admin/tax/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getTaxes();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant()  {
    try {
      console.log(this.applicantEditForm.controls.taxname.value);
      console.log(this.applicantEditForm.controls.taxrate.value);
      console.log(this.applicantEditForm.controls._id.value);
      console.log(this.submitStatus);
      if (this.applicantEditForm.valid) {
        console.log("hello if");  
        
        this.submitStatus = false;
        if (this.applicantEditForm.controls.taxname.value == '' || this.applicantEditForm.controls.taxname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.taxrate.value == '' || this.applicantEditForm.controls.taxrate.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }else {
        console.log("hello else");
          
          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/tax/'+this.applicantEditForm.controls._id.value+'/update',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              // this.reset();
              this.getTaxes();
              $("#EditFormModal").modal("hide");
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
 
  // searchDataTaxes(){
  //   // console.log(data);
    
  //   this.auth.GETMETHOD('admin/search-user/'+this.search.texts).then((res:any)=>{
  //     console.log(res);
  //    this.list = res.data
      
  //   })
  // }

}
