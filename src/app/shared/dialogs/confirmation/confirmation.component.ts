// confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div>
      <h2 mat-dialog-title class="text-xl font-bold mb-4">
        {{ data.title || 'Confirmation' }}
      </h2>

      <mat-dialog-content class="mb-6">
        <p>
          {{
            data.message || 'Êtes-vous sûr de vouloir effectuer cette action ?'
          }}
        </p>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="space-x-2">
        <button mat-button [mat-dialog-close]="false" class="hover:bg-gray-100">
          {{ data.cancelLabel || 'Non' }}
        </button>

        <button
          mat-raised-button
          color="primary"
          [mat-dialog-close]="true"
          class="hover:opacity-90"
        >
          {{ data.confirmLabel || 'Oui' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}
}

// confirmation-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  confirm(data?: ConfirmationDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: data || {},
    });

    return dialogRef.afterClosed();
  }
}
