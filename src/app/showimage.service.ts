import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShowimageService {
  billableEmpCount: any = [];
  billableEmpList: any = [];
  billableEmpListWrtClientName: any = [];
  billableEmpFresherAndExpList: any = [];
  billableEmpCountAndProfitWrtYear: any = [];

  uri = 'http://localhost:4600';
  constructor(private http: HttpClient , private router: Router) {
    this.showImage();
    // this.getBillableEmpwrtClient('clientName' , 'clientId');
    this.getBillableEmpwrtClientIdIntoTable('clientId');
   }

  showImage(): Observable<any> {
    return this.http.get(`${this.uri}/showimage.route/getimage`);
  }


  getBillableEmpCountwrtClient() {
  return this.http.get(`${this.uri}/billableEmployees/getBillableEmpCountwrtClient`);
  }

getBillableEmpwrtClient(clientName , clientId, ClientName) {
console.log(clientName , clientId, ClientName);
this.http.get(`${this.uri}/billableEmployees/getBillableEmpwrtClientName/${clientName}`).subscribe(BillableEmpListWrtClientName => {
this.billableEmpListWrtClientName = BillableEmpListWrtClientName;
this.http.get(`${this.uri}/billableEmployees/getBillableEmpFresherAndExpList/${clientId}`).subscribe(BillableEmpFresherAndExpList => {
this.billableEmpFresherAndExpList = BillableEmpFresherAndExpList;
// tslint:disable-next-line: max-line-length
this.http.get(`${this.uri}/billableEmployeesPackageDetails/getBillableEmpCountAndProfitWrtYear/${ClientName}`).subscribe(BillableEmpCountAndProfitWrtYear => {
console.log('BillableEmpCountAndProfitWrtYear service        ', BillableEmpCountAndProfitWrtYear);
this.billableEmpCountAndProfitWrtYear = BillableEmpCountAndProfitWrtYear;
// console.log('BillableEmpCountAndProfitWrtYear service        ', this.billableEmpCountAndProfitWrtYear);
this.router.navigateByUrl('/clientsdata');
});
});
}, err => {
  console.log(err);
}, () => {
  console.log('We got Billable Employee List , count and profit Wrt ClientName into service');
});
}




getBillableEmpwrtClientIdIntoTable(clientId) {
  // tslint:disable-next-line: max-line-length
  return this.http.get(`${this.uri}/billableEmployees/getBillableEmpwrtClientId/${clientId}`).subscribe(getBillableEmpwrtClientIdIntoTable => {
    console.log(getBillableEmpwrtClientIdIntoTable);
    this.billableEmpList = getBillableEmpwrtClientIdIntoTable;
   } , err => {
     console.log(err);
   }, () => {
     console.log('count and stack got successfully based on the clientname');
   });
}


getOverAllBillableEmpFresherAndExpList() {
  return this.http.get(`${this.uri}/billableEmployees/getOverallBillableEmpFresherAndExpList`);
}
}
