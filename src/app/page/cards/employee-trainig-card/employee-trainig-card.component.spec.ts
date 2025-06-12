import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTrainigCardComponent } from './employee-trainig-card.component';

describe('EmployeeTrainigCardComponent', () => {
  let component: EmployeeTrainigCardComponent;
  let fixture: ComponentFixture<EmployeeTrainigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTrainigCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTrainigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
