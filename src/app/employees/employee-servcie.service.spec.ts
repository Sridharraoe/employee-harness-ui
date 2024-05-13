import { TestBed } from '@angular/core/testing';

import { EmployeeServcieService } from './employee-servcie.service';

describe('EmployeeServcieService', () => {
  let service: EmployeeServcieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServcieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
