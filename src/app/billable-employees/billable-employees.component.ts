import { Component, OnInit } from '@angular/core';
import { BillableEmployeesService } from '../billable-employees.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsDetailsService } from '../clients-details.service';

@Component({
  selector: 'app-billable-employees',
  templateUrl: './billable-employees.component.html',
  styleUrls: ['./billable-employees.component.css']
})
export class BillableEmployeesComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private billableEmployyesDetailsservice: BillableEmployeesService, private router: Router, private clientDetailsService: ClientsDetailsService) {
    this.getClientsDetails();
   }

  clients: any = [];
  billableEmployeesDetails: any;

  ngOnInit() {
  }



  postBillableEmployeesDetails(form: NgForm) {
    console.log(form.value.clientName);
    this.billableEmployyesDetailsservice.postBillableEmployeesDetails(form.value).subscribe((BillableEmployeesDetails) => {
      console.log(BillableEmployeesDetails);
      this.router.navigateByUrl('/billableEmployeesInfo');
    },
    (err) => {
      console.log(err);
    }, () => {
      console.log('Billable Employees Details Posted Successfully');
    });
  }
  getClientsDetails() {
    this.clientDetailsService.getClientsDetails().subscribe(clientsDetails => {
      console.log(clientsDetails);
      this.clients = clientsDetails;
    }, err => {
      console.log(err);
    }, () => {
      console.log('Client Details got successfully');
    });
      }

}
