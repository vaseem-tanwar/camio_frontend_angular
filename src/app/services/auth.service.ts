import { Injectable, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //  baseURL: any = "https://nodeserver.mydevfactory.com:3000/";
  //  baseURL: any = "http://nodeserver.mydevfactory.com:3000/";
  baseURL:any = "http://localhost:3000/"
  accessToken: any;
  constructor(public http: HttpClient,
              public router: Router) {
                
               }

  POSTMETHOD(url: string , PostData: any){
    //console.log(localStorage.getItem('accessToken'))

    const URL = this.baseURL + url;
    const httpOptions = { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Accept : 'application/json',
       Authorization: 'Bearer '  + localStorage.getItem('accessToken')
      })};
    return new Promise((resolve, reject) => {
      this.http.post(URL, PostData, httpOptions).subscribe((res) => {
        resolve(res);
      }, error => {
        // console.log(error)
        reject(error);
      });
    });
  }

  GETMETHOD(url: string){
    const URL = this.baseURL + url;
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Accept : 'application/json',
     Authorization: 'Bearer '  + localStorage.getItem('accessToken')
    })};
    return new Promise((resolve, reject) => {
      this.http.get(URL,httpOptions).subscribe((res) => {
        resolve(res);
      }, error => {
        // console.log(error)
        reject(error);
      });
    });
  }

  GETMETHODSECURE(url: string){
    const URL = this.baseURL + url;
    const httpOptions = { headers: new HttpHeaders({
        // 'cache-control' : 'no-cache',
        'Content-Type': 'application/json',
        // Accept : 'application/json',
        //'x-access-token' : 'Bearer ' + localStorage.getItem('accessToken'),
         //this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      })};
    return new Promise((resolve, reject) => {
      this.http.get(URL, httpOptions).subscribe((res) => {
        resolve(res);
      }, error => {
        // console.log(error)
        reject(error);
      });
    });
  }
  POSTMETHODSECURE(url: string , PostData: any){
    const URL = this.baseURL + url;
    // tslint:disable-next-line:variable-name
    console.log(this.accessToken);
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Accept : 'application/json',
     Authorization: 'Bearer '  + localStorage.getItem('accessToken')
    })};
    return new Promise((resolve, reject) => {
      this.http.post(URL, PostData, httpOptions).subscribe((res) => {
        resolve(res);
      }, error => {
        // console.log(error)
        reject(error);
      });
    });
  }

  logout(){
    localStorage.clear();
    // localStorage.removeItem('grillAccessToken');
    // localStorage.removeItem('grillUserName');
    // localStorage.removeItem('grillUserEmail');
    // localStorage.removeItem('grillUserId');
    this.router.navigateByUrl('/login');
  }

}
