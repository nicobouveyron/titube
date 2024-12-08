import { Component, input, inject } from '@angular/core';
import { ParticipantsStore } from '../../../store/participants.store';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  template: `
    <div
      class="flex justify-between items-center p-4 bg-white rounded-xl m-2 shadow-sm"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold text-orange-300">{{ position() }}</span>
        <span class="text-xl font-bold text-black">{{ name() }}</span>
      </div>
      <button
        (click)="removeParticipant()"
        class="p-2 text-xl text-black hover:opacity-70 transition-opacity"
      >
        ✕
      </button>
    </div>
  `,
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  readonly #store = inject(ParticipantsStore);
  name = input.required<string>();
  index = input<number | null>(null);

  position = () => {
    const i = this.index();
    return i !== null && i >= 0 ? i + 1 + '.' : '';
  };

  removeParticipant() {
    this.#store.removeParticipant(this.name());
  }
}
