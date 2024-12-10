import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { slideInAnimation } from './shared/animations/route-animations';
import { SplashScreenComponent } from './splashscreen/splashscreen.component';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SplashScreenComponent, NgIf],
  template: `
    <app-splash-screen *ngIf="showSplash"></app-splash-screen>
    <app-header></app-header>
    <main
      class="max-w-[1000pt] h-[90svh] mx-auto "
      [@routeAnimations]="getRouteState(outlet)"
    >
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
  showSplash = true;

  getRouteState(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'initial';
  }
}
