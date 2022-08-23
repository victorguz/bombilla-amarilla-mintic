import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss'],
})
export class VideoControlsComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Output() clickDraw = new EventEmitter<boolean>();
  @Output() clickComment = new EventEmitter<boolean>();
  @Input() video!: HTMLVideoElement;
  currentTime!: number;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {
    this.setCurrentTimeInterval();
    console.log(this.currentTimePercent);
  }
  get currentTimePercent() {
    return this.video ? (this.currentTime * 100) / this.video.duration : 0;
  }

  set currentTimePercent(value) {
    this.video.currentTime = (value * this.video.duration) / 100;
  }
  setCurrentTimeInterval() {
    setInterval(() => {
      this.currentTime = this.video ? this.video.currentTime : 0;
    }, 1);
  }
}
