import { SafeUrl } from '@angular/platform-browser';

export interface Base64File {
  id: number;
  nombreArchivo: string;
  base64: string;
  mimeType: string;
  file?: File;
  url?: string | SafeUrl;
}

export interface ModalOptions {
  message: string;
  title?: string;
  image?: string;
  cancelText?: string;
  okText?: string;
  icon?: string;
}

export interface SpinnerMessageOptions {
  message: string;
  title?: string;
  timeoutMillis?: number;
  icon?: string;
}

export interface HttpBody {
  url: string;
  params?: any;
  headers?: any;
}
