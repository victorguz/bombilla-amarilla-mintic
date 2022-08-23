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
  @Input() video!: HTMLVideoElement;
  @Output() clickDraw = new EventEmitter<boolean>();

  currentTime!: number;
  dblclick: boolean = false;
  constructor() {
    setTimeout(() => {
      if (this.video == null) {
        this.video = document.querySelector('.video')!;
      }
      this.video.onclick = this.playVideo;
      this.setCurrentTimeInterval();
    }, 1000);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {}
  get currentTimePercent() {
    return this.video ? (this.currentTime * 100) / this.video.duration : 0;
  }

  set currentTimePercent(value) {
    this.video.currentTime = (value * this.video.duration) / 100;
  }

  setCurrentTimeInterval() {
    setInterval(() => {
      this.currentTime = this.video ? this.video.currentTime : 0;
    }, 100);
  }

  fastForwardVideo(adelantar: boolean) {
    const value = this.isPaused ? 0.01 : 1;
    this.video.currentTime += adelantar ? value : -value;
  }

  playVideo(event) {
    if (event) {
      event.target.paused ? event.target.play() : event.target.pause();
    } else {
      this.video.paused ? this.video.play() : this.video.pause();
    }
  }

  get isMuted() {
    return this.video && this.video.muted;
  }

  get isPaused() {
    return this.video && this.video.paused;
  }

  setMuted() {
    this.video ? (this.video.muted = !this.video.muted) : '';
  }

  setPaused() {
    if (this.video) {
      this.video.paused ? this.video.play() : this.video.pause();
    }
  }
}
