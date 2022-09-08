import {Component, Injectable, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public toastr: ToastrService) { }

  ngOnInit() {
  }
  successmsg(msg: any){
    console.log('successssssss');
    this.toastr.success('msg','Success')
  }
  errorsmsg(msg: any){
    this.toastr.error("Toastr Error Notification",'Error')

  }
  infotoastr(msg: any)
  {
    this.toastr.info("Important News", 'Information');
  }
  toastrwaring(msg: any)
  {
    this.toastr.warning("Battery about to Die", 'Warning');
  }

  numberOnly(event: any): boolean {
    console.log(event.which);
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 46) {
      return true;
    }else if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;

  }
}
