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
  id: number | any;

  constructor(private restService: EmployeeServcieService) {
    this.employees = [];
  }

  ngOnInit() {
    this.getEmployeeData();
    // this.id = setInterval(() => {
    //   this.getEmployeeData();
    // }, 5000);
  }

  getEmployeeData() {
    this.restService.getEmployeeData().subscribe((data) => {
      this.employees = data;
      console.log(data); /* Use the value from myData observable freely */
    });
  }

  // ngOnDestroy() {
  //   if (this.id) {
  //     clearInterval(this.id);
  //   }
  // }
}
