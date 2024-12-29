import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
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
import { ParticipantsStore } from '../../../store/participants.store';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-add-list-item',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    LucideAngularModule,
  ],
  template: `
    <div
      class="flex justify-between items-center py-[10px] pl-[20px] bg-white rounded-xl m-2 shadow-sm"
    >
      <div class="flex items-center justify-between w-full gap-2">
        <input
          class="w-full flex-1 h-12 border-0 outline-none text-2xl"
          type="text"
          [ngModel]="username()"
          (ngModelChange)="username.set($event)"
          placeholder="Ajouter un joueur..."
        />

        <div
          class="flex items-center cursor-pointer"
          (click)="addParticipant()"
        >
          <button
            class="flex items-center justify-center rounded-xl w-[40pt] h-[40pt] text-3xl bg-orange-500 text-white mx-2"
            matTooltip="Ajouter un participant"
          >
            <lucide-icon name="user-round-plus"></lucide-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './add-list-item.component.scss',
})
export class AddListItemComponent {
  username = signal('');
  @Output() usernameChange = new EventEmitter<string>();

  readonly store = inject(ParticipantsStore);

  constructor() {
    effect(() => {
      // Émet la nouvelle valeur à chaque changement du signal
      this.usernameChange.emit(this.username());
    });
  }

  async addParticipant() {
    if (this.username()) {
      this.store.addParticipant(this.username());
      this.username.set('');
    }
  }
}
