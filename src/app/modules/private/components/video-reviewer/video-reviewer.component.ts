import {
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
  currentTime!: number;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.render();
    // this.takeVideoFrame();
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
    const contenedorFlotante: HTMLDivElement = document.querySelector(
      '.contenedor-flotante'
    )!;

    const containerDnone = contenedorFlotante.classList.contains('d-none');
    if (visible && containerDnone) {
      contenedorFlotante.classList.remove('d-none');
      contenedorFlotante.classList.add('d-flex');
    } else if (!containerDnone) {
      await this.takeDrawedImage();
      contenedorFlotante.classList.add('d-none');
      contenedorFlotante.classList.remove('d-flex');
    }
    this.reset;
  }

  render() {
    this.video = this.videoRef.nativeElement;
    this.setCurrentTimeInterval();
    this.afterViewInit = true;
  }

  reset() {
    this.resetOnChange = Date.now();
  }

  isLoadedVideo() {
    return this.afterViewInit && this.video ? true : false;
  }

  setCurrentTimeInterval() {
    setInterval(() => {
      this.currentTime = this.video.currentTime;
    }, 1);
  }
}
