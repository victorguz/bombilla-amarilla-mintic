import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  base64ToFile,
  createImageFromHTML,
  secondsToHourFormat,
} from '../../../../core/services/functions.service';

@Component({
  selector: 'app-video-reviewer',
  templateUrl: './video-reviewer.component.html',
  styleUrls: ['./video-reviewer.component.scss'],
})
export class VideoReviewerComponent implements OnInit, AfterViewInit {
  @ViewChild('videoRef') videoRef!: ElementRef;
  video!: HTMLVideoElement;
  resetOnChange!: number;
  afterViewInit: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.render();
  }

  /**
   * Pausa el video y realiza la toma del frame del video
   */
  public async takeVideoFrame() {
    this.video.pause();
    this.video.currentTime;
    const image: HTMLImageElement = document.querySelector('.taken-image')!;
    image.src = (await createImageFromHTML(this.video)).toDataURL();
    this.setVisibleFrame(true);
  }

  /**
   * Toma una captura de la imagen incluyendo el dibujo hecho sobre ella
   */
  async takeDrawedImage() {
    const canvas = await createImageFromHTML(
      document.querySelector('.draw-container')!
    );
    const file = await base64ToFile(canvas.toDataURL());
    // window.open(URL.createObjectURL(file!));
  }

  /**
   * Muestra u oculta el frame que se extrajo del video en pantalla
   * @param visible true para mostrar
   */
  public async setVisibleFrame(visible: boolean) {
    const imageContainer: HTMLDivElement =
      document.querySelector('.image-container')!;
    const drawContainer: HTMLImageElement =
      document.querySelector('.draw-container')!;

    const containerDnone = imageContainer.classList.contains('d-none');
    const drawDnone = drawContainer.classList.contains('d-none');
    if (visible) {
      if (containerDnone) {
        imageContainer.classList.remove('d-none');
        imageContainer.classList.add('d-flex');
      }
      if (drawDnone) {
        drawContainer.classList.remove('d-none');
        drawContainer.classList.add('d-flex');
      }
    } else {
      await this.takeDrawedImage();
      if (!containerDnone) {
        imageContainer.classList.add('d-none');
        imageContainer.classList.remove('d-flex');
      }
      if (!drawDnone) {
        drawContainer.classList.add('d-none');
        drawContainer.classList.remove('d-flex');
      }
    }
    this.reset;
  }

  render() {
    this.video = this.videoRef.nativeElement;
    this.afterViewInit = true;
  }

  reset() {
    this.resetOnChange = Date.now();
  }

  isLoadedVideo() {
    return this.afterViewInit && this.video;
  }
}
