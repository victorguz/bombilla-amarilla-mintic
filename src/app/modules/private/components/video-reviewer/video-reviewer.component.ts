import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { of, Subject } from 'rxjs';

import {
  base64ToFile,
  createImageFromHTML,
  secondsToHourFormat,
} from '../../../../core/services/functions.service';
import { addImage, setVisibleFrame, takeDrawedImage } from '../function';

@Component({
  selector: 'app-video-reviewer',
  templateUrl: './video-reviewer.component.html',
  styleUrls: ['./video-reviewer.component.scss'],
})
export class VideoReviewerComponent
  implements OnInit, AfterViewInit, AfterContentChecked
{
  @ViewChild('videoRef') videoRef!: ElementRef;
  video!: HTMLVideoElement;
  resetOnChange!: number;
  afterViewInit: boolean = false;
  currentTime!: number;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.video = this.videoRef.nativeElement;
  }
  ngAfterContentChecked(): void {
    this.afterViewInit = true;
  }
  /**
   * Pausa el video y realiza la toma del frame del video
   */
  public async takeVideoFrame() {
    this.video.pause();
    this.video.currentTime;
    const base64 = (await createImageFromHTML(this.video)).toDataURL();

    this.setVisibleFrameVoid(true, base64);
  }

  /**
   * Toma una captura de la imagen incluyendo el dibujo hecho sobre ella
   */
  async takeDrawedImageVoid() {
    const canvas = await takeDrawedImage();
    addImage(canvas.toDataURL());
    // const file = await base64ToFile(canvas.toDataURL());
    // window.open(URL.createObjectURL(file!));
  }

  /**
   * Muestra u oculta el frame que se extrajo del video en pantalla
   * @param setVisible true para mostrar
   */
  public async setVisibleFrameVoid(setVisible: boolean, base64?: string) {
    if (!setVisible) {
      takeDrawedImage();
    }
    setVisibleFrame(setVisible,base64);
    this.reset();
  }

  reset() {
    this.resetOnChange = Date.now();
  }

  isLoadedVideo() {
    return this.afterViewInit && this.video ? true : false;
  }
}
