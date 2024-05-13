import { Component } from '@angular/core';
import { EmployeeServcieService } from './employee-servcie.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'birthDate',
    'department',
    'salary',
  ];
  employees: any;

  constructor(private restService: EmployeeServcieService) {
    this.employees = [];
  }

  ngOnInit() {
    this.getEmployeeData();
    //   setInterval(() => {
    //    this.getEmployeeData();
    //    }, 3000);
  }

  getEmployeeData() {
    this.restService.getEmployeeData().subscribe((data) => {
      this.employees = data;
      console.log(data); /* Use the value from myData observable freely */
    });
  }

  ngOnDestroy() {
    clearInterval(this.employees);
  }
}
