import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoReviewerComponent } from './video-reviewer.component';

describe('VideoReviewerComponent', () => {
  let component: VideoReviewerComponent;
  let fixture: ComponentFixture<VideoReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
