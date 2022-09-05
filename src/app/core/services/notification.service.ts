import { Injectable } from '@angular/core';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import {
  ModalOptions,
  SpinnerMessageOptions,
} from '../../interfaces/shared.interfaces';
import { DialogComponent } from '../../modules/shared/components/dialog/dialog.component';
import { SpinnerComponent } from '../../modules/shared/components/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(protected dialog: MatDialog) {}
  /**
   * @description muestra un modal dependiendo el tipo seleccionado
   */
  private showModal(options: ModalOptions, type: 'confirmation' | 'info') {
    let subject = new Subject<boolean>();

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { options, type },
      // width: '987px',
      // height: '586px',
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * @description muestra un modal de confirmación
   */
  modalConfirmacion(options: ModalOptions) {
    return this.showModal(options, 'confirmation');
  }

  /**
   * @description Muesra un modal informativo
   */
  modalInformacion(options: ModalOptions) {
    return this.showModal(options, 'info');
  }

  /**
   * @description muestra un modal de tipo spinner
   */
  notificacion(options: SpinnerMessageOptions) {
    let subject = new Subject<boolean>();

    const dialogRef = this.dialog.open(SpinnerComponent, {
      data: { options },
      // width: '987px',
      // height: '586px',
      autoFocus: false,
      hasBackdrop: false,
      closeOnNavigation: false,
      disableClose: true,
      position: {
        top: '1rem',
        right: '1rem',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      subject.next(result);
    });

    return subject.asObservable();
  }
}
