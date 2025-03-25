import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SikllComponent } from './sikll.component';

describe('SikllComponent', () => {
  let component: SikllComponent;
  let fixture: ComponentFixture<SikllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SikllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SikllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
