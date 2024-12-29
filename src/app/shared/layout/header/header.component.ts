import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule } from 'lucide-angular';
import { SettingsDialogComponent } from '../../../game/dialogs/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  goBack() {
    window.history.back();
  }

  onClickSettings() {
    this.dialog
      .open(SettingsDialogComponent, {
        minWidth: '500px',
        maxWidth: '800px',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
