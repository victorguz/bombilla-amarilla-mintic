import { HttpErrorResponse } from '@angular/common/http';
import { config } from '../default.config';
import { isNotEmpty, isString } from 'class-validator';
import {
  FormStyle,
  getLocaleDayNames,
  getLocaleMonthNames,
} from '@angular/common';
import { Base64File } from '../../interfaces/shared.interfaces';
import html2canvas from 'html2canvas';
import { secureStorage } from '../secure.config';

///////////////Funciones globales

/**{
 * }
 * Pone en mayusculas la inicial de cada palabra y en minusculas el resto de las letras en una cadena.
 * @param cad
 * @param split
 */
export function toTitleCase(cad: string, split: string = ' ') {
  cad = cad.trim().toLowerCase();
  if (isNotEmpty(cad)) {
    let arr = cad.split(split);
    cad = '';
    arr.forEach((e) => {
      if (e) {
        cad += e[0].toUpperCase() + e.substring(1) + ' ';
      }
    });
  }
  return cad;
}

/**
 * Pone en mayusculas la inicial de cada frase separandola por puntos (.)
 * @param cad
 */
export function toPhraseCase(cad: string) {
  return toTitleCase(cad, '.');
}

/**
 * Obtiene la configuración con la clave 'name'
 * @param name Nombre de la configuración
 * @returns {any}
 */
export function getConfig(name: string) {
  //find config on database ad return it if it's found.
  //return ConfigService.getConfig(name)
  //else

  return config[name];
}

/**
 * Set the data on secureStorage (secureStorage)
 * @param name item name
 * @param data item data
 */
export function setOnLocal(name: string, data: any) {
  if (!isNotEmpty(name)) {
    throw new Error('El nombre de la variable local no puede estar vacío');
  }
  secureStorage.setItem(name, data);
}
/**
 * Deletes item from secureStorage (secureStorage)
 * @param name
 */
export function removeFromLocal(name: string) {
  if (!isNotEmpty(name)) {
    throw new Error('El nombre de la variable local no puede estar vacío');
  }
  secureStorage.removeItem(name);
}

/**
 * Gets the secureStorage (secureStorage) string by name and parse it like JSON.
 * If it isn't an object, array or string, returns null.
 * @param name
 * @returns the object or array
 */
export function getFromLocal(name: string): any {
  return secureStorage.getItem(name);
}

export function pushToLocalArray(name: string, value: any) {
  let array: any[] = getFromLocal(name);
  if (!array) {
    array = [];
  }
  array.push(value);
  setOnLocal(name, array);
}

export function getBasicError(error: any, print: boolean = false): any {
  if (print) {
    console.error(error);
  }
  if (error instanceof HttpErrorResponse) {
    return error.error;
  }
  return error;
}
export function getErrorMessage(error: any, print: boolean = true): string {
  const error2 = getBasicError(error);
  if (print) {
    console.error(error, error2);
  }
  return error.message ? error.message : 'Error en la petición';
}

/**
 * Retorna una cadena solamente con numeros y letras
 * @param cad
 * @returns
 */
export function ignoreSpecialCharacters(
  cad: string,
  replacer: string = ''
): string {
  return cad.trim().replaceAll(/[\W]/gi, replacer);
}

/**
 * Retorna una cadena solamente con numeros y letras
 * @param cad
 * @returns
 */
export function ignoreAllCharactersExceptLettersAndSpaces(
  cad: string,
  replacer: string = ''
): string {
  return cad.trim().replaceAll(/[^a-zA-Z ]/gi, replacer);
}

/**
 * Convierte una fecha en el formato 'dd/mm/yyyy', ideal para oracle
 * @param fecha
 * @param sep separador de las variables de la fecha
 * @returns
 */
export function dateToStringDayMonthYear(fecha: Date, sep: string = '/') {
  return `${fecha.getDate()}${sep}${
    fecha.getMonth() + 1
  }${sep}${fecha.getFullYear()}`;
}

/**
 * Muestra un Spinner (loading) y muestra el mensaje especificado
 * @param message
 */
export function showLoadingSpinner(message: string = 'Loading...') {
  document
    .getElementById('aurora-spinner-container')
    ?.removeAttribute('hidden');
  const spinnerMessage = document.getElementById('aurora-spinner-message');
  spinnerMessage ? (spinnerMessage.innerHTML = message) : '';
}

export function hideLoadingSpinner() {
  document
    .getElementById('aurora-spinner-container')
    ?.setAttribute('hidden', 'true');
}

/**
 * Evalúa si una cadena es una contraseña válida. Esta contraseña debe tener
 * por lo menos 8 dígitos, 3 de los 4 siguientes tipos de caracter:
 * minúsculas, mayúsculas, números, especiales
 * @param value cadena a evaluar
 */
export function isPassword(value: string): boolean {
  let regex =
    /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,}$/;
  if (value.match(regex) != null) {
    return true;
  }
  return false;
}

export function sortArray(array: any[], key: string | undefined = undefined) {
  if (key) {
    return array.sort((a, b) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    });
  }
  return array;
}
/**
 * Obtiene el día del mes segun los dias restados o sumados
 * @param days Días que se desean aumentar o restar
 * @returns
 */
export function getMonthDay(days: number = 0) {
  const date = new Date(new Date().setDate(new Date().getDate() + days));
  return date.getDate();
}

export function getDayName(
  date: Date,
  length: 1 | 2 | 3 | 100 = 100,
  locale: string = config.app.locale
) {
  let dayLength: number;
  switch (length) {
    case 1:
      dayLength = 0;
      break;
    case 2:
      dayLength = 3;
      break;
    case 3:
      dayLength = 1;
      break;
    case 100:
      dayLength = 2;
      break;
  }
  const days = getLocaleDayNames(locale, FormStyle.Standalone, dayLength);
  const day: number = date.getDay();
  return days[day].toUpperCase();
}

export function getMonthName(
  date: Date,
  length: 1 | 2 | 3 | 100 = 100,
  locale: string = config.app.locale
) {
  let monthLength: number;
  switch (length) {
    case 1:
      monthLength = 0;
      break;
    case 2:
      monthLength = 3;
      break;
    case 3:
      monthLength = 1;
      break;
    case 100:
      monthLength = 2;
      break;
  }
  const months = getLocaleMonthNames(locale, FormStyle.Standalone, monthLength);
  const month: number = date.getMonth();
  return months[month].toUpperCase();
}

export function valueToCurrency(value: number, currency: string) {
  return `$${value} ${currency}`;
}

export async function base64ToFile(loadedFile: Base64File | string) {
  if (loadedFile != undefined) {
    ('data:image/png;base64,');
    let url;
    let newFile;
    if (isString(loadedFile)) {
      newFile = {
        mimeType: loadedFile.substring(
          loadedFile.indexOf(':') + 1,
          loadedFile.indexOf(';base64,')
        ),
        nombreArchivo:
          'archivo.' +
          loadedFile.substring(
            loadedFile.indexOf('/') + 1,
            loadedFile.indexOf(';base64,')
          ),
      };
      url = loadedFile;
    } else {
      url = `data:${loadedFile.mimeType};base64,${loadedFile.base64}`;
      newFile = {
        mimeType: loadedFile.mimeType,
        nombreArchivo: loadedFile.nombreArchivo,
      };
    }
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], newFile.nombreArchivo, {
      type: newFile.mimeType,
    });
  }
  return null;
}

export function createImageFromHTML(
  element: HTMLElement
): Promise<HTMLCanvasElement> {
  return html2canvas(element);
}

export function secondsToHourFormat(sec_num: number, maxValue?: number) {
  let result = '';
  sec_num = sec_num ? sec_num : 0;
  let hours: any = Math.floor(sec_num / 3600);
  let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: any = sec_num - hours * 3600 - minutes * 60;
  let miliseconds: any = Math.round((seconds - Math.floor(seconds)) * 1000);

  const formatNumber = (n: number) => {
    return n < 10 ? '0' + n : n;
  };
  if (maxValue && maxValue > 1) {
    result = '';
    if (maxValue > 3600) {
      result += formatNumber(hours) + ':';
    }
    if (maxValue > 60) {
      result += formatNumber(minutes) + ':';
    }
    result +=
      formatNumber(Math.floor(seconds)) + ':' + formatNumber(miliseconds);
  } else {
    result =
      formatNumber(hours) +
      ':' +
      formatNumber(minutes) +
      ':' +
      formatNumber(Math.floor(seconds)) +
      ':' +
      formatNumber(miliseconds);
  }
  return result;
}
