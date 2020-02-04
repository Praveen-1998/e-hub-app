import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  // TargetInfo: any = [];


  backendUrl = 'http://localhost:4600';

  constructor(private http: HttpClient , private router: Router) {
    // this.getTargetInfoOfTheYear(); 
  }

  postBillableEmployeesPackageDetails(BillableEmployeesPackageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${this.backendUrl}/billableEmployeesPackageDetails/postBillableEmployeesPackageDetails`, BillableEmployeesPackageDetails);
  }

  getBillableEmployeesPackageDetails() {
    return this.http.get(`${this.backendUrl}/billableEmployeesPackageDetails/getBillableEmployeesPackageDetails`);
  }
  getBillableEmployeesRevenueDetails() {
    return this.http.get(`${this.backendUrl}/billableEmployeesPackageDetails/getBillableEmployeesRevenueDetails`);
  }

  getTargetInfoOfTheYear() {
  return this.http.get(`${this.backendUrl}/billableEmployeesPackageDetails/getTargetInfoOfTheYear`);
  }

}
