import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTrainigCardComponent } from './company-trainig-card.component';

describe('CompanyTrainigCardComponent', () => {
  let component: CompanyTrainigCardComponent;
  let fixture: ComponentFixture<CompanyTrainigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyTrainigCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTrainigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
