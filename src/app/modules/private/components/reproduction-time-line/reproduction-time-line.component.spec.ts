import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductionTimeLineComponent } from './reproduction-time-line.component';

describe('ReproductionTimeLineComponent', () => {
  let component: ReproductionTimeLineComponent;
  let fixture: ComponentFixture<ReproductionTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReproductionTimeLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproductionTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
