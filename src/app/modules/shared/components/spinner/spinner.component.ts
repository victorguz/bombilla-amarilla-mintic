import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerMessageOptions } from '../../../../interfaces/shared.interfaces';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(
    public dialogRef: MatDialogRef<SpinnerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      options: SpinnerMessageOptions;
    }
  ) {
    if (this.data.options.timeoutMillis) {
      setTimeout(() => this.onCancel(), this.data.options.timeoutMillis);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }
}
