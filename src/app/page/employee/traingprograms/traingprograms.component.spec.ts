import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingprogramsComponent } from './traingprograms.component';

describe('TraingprogramsComponent', () => {
  let component: TraingprogramsComponent;
  let fixture: ComponentFixture<TraingprogramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraingprogramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraingprogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
