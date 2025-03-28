import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaliJobBoardComponent } from './internali-job-board.component';

describe('InternaliJobBoardComponent', () => {
  let component: InternaliJobBoardComponent;
  let fixture: ComponentFixture<InternaliJobBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternaliJobBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternaliJobBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
