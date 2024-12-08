import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    data: { animation: 'lobby' },
  },
  {
    path: 'lobby',
    loadComponent: () =>
      import('./lobby/lobby.component').then((m) => m.LobbyComponent),
    data: { animation: 'lobby' },
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./game/game.component').then((m) => m.GameComponent),
    data: { animation: 'game' },
  },
];
