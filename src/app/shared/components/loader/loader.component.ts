// loader.component.ts
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { LoaderService } from '../../../services/loader.service';
import { Rive } from '@rive-app/canvas';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <!-- <div *ngIf="loaderService.isLoading$()" class="loader-overlay"> -->
    <div
      class="loader-overlay"
      [style.z-index]="loaderService.isLoading$() ? '9999' : '-1'"
      [style.opacity]="loaderService.isLoading$() ? '1' : '0'"
    >
      <!-- <div class="loader"></div> -->
      <canvas id="riveCanvas" #riveCanvas></canvas>
      <p class="bg-orange-500">Chargement en cours...</p>
    </div>
  `,
  styles: [
    `
      p {
        font-size: 18pt;
        color: white;
        border-radius: 6px;
        padding: 15px;
      }
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #faf4e4a8;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
        gap: 20px;
      }

      .loader {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-radius: 50%;
        border-top: 5px solid #3498db;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent implements AfterViewInit {
  @ViewChild('riveCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  private riveUrl = 'le_titube.riv';

  constructor(public loaderService: LoaderService) {}
  ngAfterViewInit(): void {
    this.loadRiveAnimation();
  }

  riveInstance: Rive | null = null;

  async loadRiveAnimation(animation?: string) {
    if (this.canvas) {
      try {
        // Initialisation de Rive avec le canvas
        this.riveInstance = new Rive({
          canvas: this.canvas.nativeElement,
          src: this.riveUrl,
          autoplay: true,
          artboard: 'titouLoading',
          onLoad: () => {
            if (animation) {
              this.riveInstance?.play(animation);
            }
          },
        });
        this.riveInstance.resizeToCanvas();
        this.riveInstance.resizeDrawingSurfaceToCanvas();
        console.log(this.riveInstance);
      } catch (error) {
        console.error("Erreur lors du chargement de l'animation Rive:", error);
      }
    }
  }
}
