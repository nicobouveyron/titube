import {
  Component,
  effect,
  EventEmitter,
  Output,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-list-item',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  template: `
    <div
      class="flex justify-between items-center py-[10px] pl-[20px] bg-white rounded-xl m-2 shadow-sm"
    >
      <div class="flex items-center justify-between w-full gap-2">
        <input
          class="flex-1 h-12 border-0 outline-none text-2xl"
          type="text"
          [ngModel]="username()"
          (ngModelChange)="username.set($event)"
          placeholder="Ajouter un joueur..."
        />
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './add-list-item.component.scss',
})
export class AddListItemComponent {
  username = signal('');
  @Output() usernameChange = new EventEmitter<string>();

  constructor() {
    effect(() => {
      // Émet la nouvelle valeur à chaque changement du signal
      this.usernameChange.emit(this.username());
    });
  }
}
