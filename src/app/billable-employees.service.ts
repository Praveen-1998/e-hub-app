import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillableEmployeesService {
  count: any;
  backendUrl = 'http://localhost:4600';
  constructor(private http: HttpClient) {
    this.getBillableEmployeesDetailsCount();
  }

stack: any;

  postBillableEmployeesDetails(BillableEmployeesDetails) {
    return this.http.post(`${this.backendUrl}/billableEmployees/postBillableEmployeesDetails`, BillableEmployeesDetails);
  }

  getBillableEmployeesDetails() {
    return this.http.get(`${this.backendUrl}/billableEmployees/getBillableEmployeesDetails`);
  }

  getBillableEmployeesDetailsCount() {
    return this.http.get(`${this.backendUrl}/billableEmployees/getBillableEmployeesDetailsCount`);
  }
  getBillableEmployeesExpDetails() {
    return this.http.get(`${this.backendUrl}/billableEmployees/getBillableEmployeesExpDetails`);
  }

  postBillableEmployeesPackageDetails(BillableEmployeesPackageDetails) {
    return this.http.post(`${this.backendUrl}/billableEmployees/postBillableEmployeesPackageDetails`, BillableEmployeesPackageDetails);
  }
}
