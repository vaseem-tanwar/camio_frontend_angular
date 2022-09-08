import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormControl, FormGroup, Validators,   } from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../../../services/helper.service";
import {ToastrService} from "ngx-toastr";

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p: number = 1;
  list:any=[];      
  viewdetail: any=[];
  details:any={};
  role:any='';
  search:any={};
  delId: any;
  submitStatus: boolean = false;
    start:any=0;
    pagenumber:any='';
    pagelimit:any=50;
    totalpage:any='';
  truckOwnerForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    city: new FormControl('', [ Validators.required]),
    country: new FormControl('', [ Validators.required]), 
    // image: new FormControl(''),
  });

  truckDriverForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    city: new FormControl('', [ Validators.required]),
    country: new FormControl('', [ Validators.required]), 
    // image: new FormControl(''),
  });

  shipperForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    city: new FormControl('', [ Validators.required]),
    country: new FormControl('', [ Validators.required]), 
    // image: new FormControl(''),
  });

  adminForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required]),
    city: new FormControl('', [ Validators.required]),
    country: new FormControl('', [ Validators.required]), 
    // image: new FormControl(''),
  });

  applicantEditForm = new FormGroup({
    _id: new FormControl('', [ Validators.required]),
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    // address: new FormControl('', [ Validators.required]),
    phone: new FormControl('', [ Validators.required]),
    city: new FormControl('', [ Validators.required]),
    country: new FormControl('', [ Validators.required]), 
    // image: new FormControl(''),
  });


  constructor(
    private location: Location,
    public rout:ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public helper: HelperService,
    public toastr: ToastrService) {
      this.rout.params.subscribe((params)=>{
        console.log(params);
        this.role=params['role'];
        if(this.role=='Shippers'){
          console.log("shippers");
          this.getShippers();
         }else if(this.role=='Drivers'){
          console.log("Drivers");
     
        this.getTruckDrivers();
    
         }
         else if(this.role=='Owners'){
          console.log("Owners");
    
          this.getTruckOwners();
    
         }
         else if(this.role=='Admins'){
          console.log("Admins");
    
          this.getAdmins();
         }
       
      });
      
  }
  ngOnInit(): void {
     //this.getUsers();
    //this.getShippers();

    
  }

  getUsers(){
    console.log('check')
    this.auth.GETMETHOD('admin/usersList').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getShippers(){
    console.log('check')
    this.auth.GETMETHOD('admin/shippers/get').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getAdmins(){
    console.log('check')
    this.auth.GETMETHOD('admin/get').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getTruckDrivers(){
    console.log('check')
    this.auth.GETMETHOD('admin/truckdriver/get').then((res: any) => {
      console.log(res);
     this.list = res.response_data;
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  getTruckOwners(){
    console.log('check')
    this.auth.GETMETHOD('admin/truckowner/get').then((res: any) => {
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
    this.auth.POSTMETHOD('admin/'+id+'/userIsactive',{'status': st, '_id': id}).then((res: any) => {
      console.log(res);
      if(res.message=='status has been changed'){
        if(this.role=='Shippers'){
          console.log("shippers");
          this.getShippers();
         }else if(this.role=='Drivers'){
          console.log("Drivers");
     
        this.getTruckDrivers();
    
         }
         else if(this.role=='Owners'){
          console.log("Owners");
    
          this.getTruckOwners();
    
         }
         else if(this.role=='Admins'){
          console.log("Admins");
    
          this.getAdmins();
         }
      }
     //this.getTruckOwners();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  reset() {
    this.truckOwnerForm.reset();
    this.submitStatus = false;
  }
  async createTruckOwner() {
    try {
      console.log(this.truckOwnerForm.controls.email.value);
      if (this.truckOwnerForm.valid) {
        this.submitStatus = false;
        if (this.truckOwnerForm.controls.firstname.value == '' || this.truckOwnerForm.controls.firstname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.truckOwnerForm.controls.email.value == '' || this.truckOwnerForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.truckOwnerForm.controls.phone.value == '' || this.truckOwnerForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.truckOwnerForm.controls.lastname.value == '' || this.truckOwnerForm.controls.lastname.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.truckOwnerForm.controls.password.value == '' || this.truckOwnerForm.controls.password.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
        }else if (this.truckOwnerForm.controls.city.value == '' || this.truckOwnerForm.controls.city.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else if (this.truckOwnerForm.controls.country.value == '' || this.truckOwnerForm.controls.country.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
          } else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/truckowner/post',
            this.truckOwnerForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
              this.getTruckOwners();
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

  async createTruckDriver() {
    try {
      console.log(this.truckDriverForm.controls.email.value);
      if (this.truckDriverForm.valid) {
        this.submitStatus = false;
        if (this.truckDriverForm.controls.firstname.value == '' || this.truckDriverForm.controls.firstname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.truckDriverForm.controls.email.value == '' || this.truckDriverForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.truckDriverForm.controls.phone.value == '' || this.truckDriverForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.truckDriverForm.controls.lastname.value == '' || this.truckDriverForm.controls.lastname.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.truckDriverForm.controls.password.value == '' || this.truckDriverForm.controls.password.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
        }else if (this.truckDriverForm.controls.city.value == '' || this.truckDriverForm.controls.city.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else if (this.truckDriverForm.controls.country.value == '' || this.truckDriverForm.controls.country.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/truckdriver/post',
            this.truckDriverForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
              this.getTruckDrivers();
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

  async createAdmin() {
    try {
      console.log(this.adminForm.controls.email.value);
      if (this.adminForm.valid) {
        this.submitStatus = false;
        if (this.adminForm.controls.firstname.value == '' || this.adminForm.controls.firstname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.adminForm.controls.email.value == '' || this.adminForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.adminForm.controls.phone.value == '' || this.adminForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.adminForm.controls.lastname.value == '' || this.adminForm.controls.lastname.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.adminForm.controls.password.value == '' || this.adminForm.controls.password.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
        }else if (this.adminForm.controls.city.value == '' || this.adminForm.controls.city.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else if (this.adminForm.controls.country.value == '' || this.adminForm.controls.country.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/post/addadmin',
            this.adminForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
              this.getAdmins();
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

  async createShipper() {
    try {
      console.log(this.shipperForm.controls.email.value);
      if (this.shipperForm.valid) {
        this.submitStatus = false;
        if (this.shipperForm.controls.firstname.value == '' || this.shipperForm.controls.firstname.value == undefined) {
          // this.toastr.error('Please select your profile image', 'Error');
          this.submitStatus = true;
        } else if (this.shipperForm.controls.email.value == '' || this.shipperForm.controls.email.value == undefined) {
          // this.toastr.error('Please select your guard licence', 'Error');
          this.submitStatus = true;
        } else if (this.shipperForm.controls.phone.value == '' || this.shipperForm.controls.phone.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.shipperForm.controls.lastname.value == '' || this.shipperForm.controls.lastname.value == undefined) {
          // this.toastr.error('Please select your back ground checking file', 'Error');
          this.submitStatus = true;
        }else if (this.shipperForm.controls.password.value == '' || this.shipperForm.controls.password.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
        }else if (this.shipperForm.controls.city.value == '' || this.shipperForm.controls.city.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else if (this.shipperForm.controls.country.value == '' || this.shipperForm.controls.country.value == undefined) {
          //  this.toastr.error('Please select your back ground checking file', 'Error');
           this.submitStatus = true;
         }else {

          this.submitStatus = false;
          const user = await this.auth.POSTMETHOD('admin/shippers/post',
            this.shipperForm.value
          ).then((res: any) => {
            console.log(res);
            // this.lists = res.data.result;
            if (res.status == true) {
              this.toastr.success(res.message, 'Success');
              this.reset();
              // this.getList();
              this.getShippers();
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
    this.auth.POSTMETHOD('admin/'+id, {'userId': id}).then((res: any) => {
      console.log(res);
      this.details = res.response_data;
      console.log(this.details.firstname);
      this.applicantEditForm.controls._id.setValue(this.details._id);
      this.applicantEditForm.controls.firstname.setValue(this.details.firstname);
      this.applicantEditForm.controls.lastname.setValue(this.details.lastname);
      this.applicantEditForm.controls.phone.setValue(this.details.phone);
      this.applicantEditForm.controls.city.setValue(this.details.city);
      this.applicantEditForm.controls.country.setValue(this.details.country);
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


  deleteAdmins(){
    console.log(this.delId,'id');
    
    this.auth.POSTMETHOD('admin/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getAdmins();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  deleteTruckOwners(){
    console.log(this.delId,'id');
    
    this.auth.POSTMETHOD('admin/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getTruckOwners();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  deleteTruckDrivers(){
    console.log(this.delId,'id');
    
    this.auth.POSTMETHOD('admin/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getTruckDrivers();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }

  deleteShippers(){
    console.log(this.delId,'id');
    
    this.auth.POSTMETHOD('admin/'+this.delId+'/delete', {_id: this.delId}).then((res: any) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getShippers();
    }, error => {
      // this.helper.Hideloading();
      // this.helper.printErrorMsg(error.error.error);
    });
  }


  async UpdateShippers()  {
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
              this.getShippers();
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

  async UpdateTruckDrivers()  {
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
        } else if (this.applicantEditForm.controls.city.value == '' || this.applicantEditForm.controls.city.value == undefined) {
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
              this.getTruckDrivers();
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
        }
        // }else if (this.applicantEditForm.controls.address.value == '' || this.applicantEditForm.controls.address.value == undefined) {
        //   // this.toastr.error('Please select your back ground checking file', 'Error');
        //   this.submitStatus = true;
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
              this.getAdmins();
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

  async UpdateTruckOwners()  {
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
        } else if (this.applicantEditForm.controls.city.value == '' || this.applicantEditForm.controls.city.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        } else if (this.applicantEditForm.controls.country.value == '' || this.applicantEditForm.controls.country.value == undefined) {
          // this.toastr.error('Please select your weapon licence', 'Error');
          this.submitStatus = true;
        }else {
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
              this.getTruckOwners();
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

 
   searchDataOwner(){
    // console.log(data);
    
    this.auth.GETMETHOD('admin/search-user/'+this.search.texts).then((res:any)=>{
      console.log(res);
     this.list = res.data
      
    })
  }

  searchDataAdmin(){
    // console.log(data);
    
    this.auth.GETMETHOD('admin/search-user/'+this.search.texts).then((res:any)=>{
      console.log(res);
     this.list = res.data
      
    })
  }

  searchDataShipper(){
    // console.log(data);
    
    this.auth.GETMETHOD('admin/search-user/'+this.search.texts).then((res:any)=>{
      console.log(res);
     this.list = res.data
      
    })
  }

  searchDataDriver(){
    // console.log(data);
    
    this.auth.GETMETHOD('admin/search-user/'+this.search.texts).then((res:any)=>{
      console.log(res);
     this.list = res.data
      
    })
  }
}