import {
  createImageFromHTML,
  hideLoadingSpinner,
  pushToLocalArray,
  showLoadingSpinner,
} from '../../../core/services/functions.service';
import { AttachedInterface } from '../../../interfaces/comment.interface';

/**
 * Toma una captura de la imagen incluyendo el dibujo hecho sobre ella
 */
export async function takeDrawedImage() {
  showLoadingSpinner();
  const result = createImageFromHTML(
    document.querySelector('.draw-container .content')!
  );
  hideLoadingSpinner();
  return result;
}

/**
 * Muestra u oculta el frame que se extrajo del video en pantalla
 * @param setVisible true para mostrar
 */
export function setVisibleFrame(setVisible: boolean, base64?: string) {
  const contenedorFlotante: HTMLDivElement = document.querySelector(
    '.contenedor-flotante'
  )!;

  if (base64) {
    const image: HTMLImageElement = document.querySelector('.taken-image')!;
    image.src = base64;
  }

  if (setVisible) {
    contenedorFlotante.classList.remove('d-none');
  } else {
    contenedorFlotante.classList.add('d-none');
  }
}

export function addImage(base64: string) {
  const item: AttachedInterface = {
    id: Date.now(),
    base64,
  };
  pushToLocalArray('images', item);
  return item;
}
