// import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormControl, FormGroup, Validators,   } from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit {
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts:any;
  p: number = 1;
  list:any=[];      
  viewdetail: any=[];
  details:any={};
  search:any={};
  urls:any=[];
  selectedFile:any=[];
  selectedFileTyep:any=null;
  dataForm=new FormData();
  delId: any;
  submitStatus: boolean = false;
  charCodeArray:any=[];
  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    trucktype: new FormControl('', [ Validators.required]),
    truckimage: new FormControl('', [ Validators.required]),
    parentid: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
    // address: new FormControl('', [ Validators.required]),
   // phone: new FormControl('', [ Validators.required]),
    // image: new FormControl(''),
  });

  applicantForm = new FormGroup({
    trucktype: new FormControl('', [ Validators.required]),
    truckimage: new FormControl('', [ Validators.required]),
    parentid: new FormControl('', [ Validators.required]),
    description: new FormControl('', [ Validators.required]),
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
    public toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getTrucks();
    this.http.get('http://jsonplaceholder.typicode.com/posts')
    .subscribe(posts => {
      this.posts = posts;})
  }

  getTrucks(){
    console.log('check')
    this.auth.GETMETHOD('admin/trucktype/trucksList').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  uploadTruckImg(event:any){
    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
    }
    console.log(this.selectedFile);
    
  } 
  insertImage(event:any) {

    let files = event.target.files;
    console.log(files)
    if (files) {
      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();
        console.log(this.selectedFile);

        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.selectedFile = (this.urls);
        }
        reader.readAsDataURL(file);
      }
    }
  }
  changeStatus(isApproved:any, id: any){
    let st;
    if (isApproved == 'Active') {
      st = 'InActive';
    } else {
      st = 'Active';
    }
    this.auth.POSTMETHOD('admin/trucktype/'+id+'/truckIsactive',{'status': st, '_id': id}).then((res: any) => {
      console.log(res);
     this.getTrucks();
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
        if (this.applicantForm.controls.truckimage.value == '' || this.applicantForm.controls.truckimage.value == undefined){
     
        } else if(this.applicantForm.controls.trucktype.value == '' || this.applicantForm.controls.trucktype.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if(this.applicantForm.controls.parentid.value == '' || this.applicantForm.controls.parentid.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantForm.controls.description.value == '' || this.applicantForm.controls.description.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else {
console.log(this.selectedFile);
          for(let i=0; i<this.selectedFile.length;i++){
            this.dataForm.append('image'+i,this.selectedFile[i],this.selectedFile[i].name)
          }
          this.dataForm.append('id',"2")
console.log(this.dataForm);


          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/trucktype/createTruck',
            {data:this.applicantForm.value}
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
              this.getTrucks();
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
    this.auth.POSTMETHOD('admin/trucktype/'+id+'/update', {'truckId': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      console.log(this.details.trucktype);
      this.applicantEditForm.controls._id.setValue(this.details._id);
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
    
    this.auth.POSTMETHOD('admin/trucktype/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getTrucks();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  async UpdateApplicant()  {
    try {
      console.log(this.applicantEditForm.controls.trucktype.value);
      console.log(this.applicantEditForm.controls.description.value);
      console.log(this.applicantEditForm.controls._id.value);
      console.log(this.submitStatus);
      if (this.applicantEditForm.valid) {
        console.log("hello if");  
        
        this.submitStatus = false;
        if (this.applicantEditForm.controls.trucktype.value == '' || this.applicantEditForm.controls.trucktype.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.description.value == '' || this.applicantEditForm.controls.description.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }else {
        console.log("hello else");
          
          this.submitStatus = false;
          const tax = await this.auth.POSTMETHOD('admin/trucktype/'+this.applicantEditForm.controls._id.value+'/update',
            this.applicantEditForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              // this.reset();
              this.getTrucks();
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
        console.log("hello submit status");
        
        this.submitStatus = true;
      }

    } catch (error: any) {
      this.toastr.error(error['message'], 'Invalid values');
    }
  }
  setFormatTruckType(event:any){
      // console.log(event)
      // let charCode=(event.which) ? event.which:event.keyCode;
      // this.charCodeArray.push(charCode);
      // console.log(this.charCodeArray);
      // const found = this.charCodeArray.find((item: any) => ((item>=65&&item<=90)||(item>=97)&&(item<=122)));
      // console.log(found,'found')
      let regex=/\w+/g;
      let result=this.applicantForm.controls.trucktype.value?.match(regex);
      console.log(result);
      
      }

      
    }

  // searchDataTrucks(){
  //   // console.log(data);
    
  //   this.auth.GETMETHOD('admin/search-user/'+this.search.texts).then((res:any)=>{
  //     console.log(res);
  //    this.list = res.data
      
  //   })
  // }

