import {
  arrayNotEmpty,
  isArray,
  isEmpty,
  isNotEmptyObject,
  isObject,
} from 'class-validator';

// Encriptacion de localStorage
export const secureStorage = {
  getItem(name: string): any {
    if (isEmpty(name)) {
      throw new Error('El nombre de la variable local no puede estar vacío');
    }
    const result = localStorage.getItem(name);
    return result ? JSON.parse(result) : null;
  },
  setItem(name: string, data: any): void {
    if (isEmpty(name)) {
      throw new Error('El nombre de la variable local no puede estar vacío');
    }
    if (isEmpty(data)) {
      throw new Error(
        'El valor de la variable local no puede ser una cadena vacía, null o undefined'
      );
    }
    if (
      (isObject(data) && !isNotEmptyObject(data)) ||
      (isArray(data) && !arrayNotEmpty(data))
    ) {
      throw new Error(
        'El valor de la variable local no puede ser un objeto o arreglo vacío'
      );
    }
    localStorage.setItem(name, JSON.stringify(data));
  },

  removeItem(name: string): void {
    if (isEmpty(name)) {
      throw new Error('El nombre de la variable local no puede estar vacío');
    }
    localStorage.removeItem(name);
  },
};
