import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsViewerComponent } from './comments-viewer.component';

describe('CommentsViewerComponent', () => {
  let component: CommentsViewerComponent;
  let fixture: ComponentFixture<CommentsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
