import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-username',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <div class="dialog-content">
      <div class="dialog-container">
        <h2 class="dialog-title">Ajouter un participant</h2>

        <mat-form-field>
          <mat-label>Username</mat-label>
          <input
            [(ngModel)]="username"
            matInput
            placeholder="Ex. Pizza"
            value="Sushi"
          />
        </mat-form-field>

        <div class="dialog-actions">
          <button mat-button (click)="close()">Annuler</button>
          <button
            mat-raised-button
            color="primary"
            (click)="submit()"
            [disabled]="!username.trim()"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class AddUsernameComponent {
  private dialogRef = inject(MatDialogRef<AddUsernameComponent>);
  username = '';

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.username.trim()) {
      this.dialogRef.close(this.username);
    }
  }
}
