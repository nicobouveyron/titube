import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Rive } from '@rive-app/canvas';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  template: `
    <div class="splash-container">
      <canvas
        class="w-full h-full max-h-[250pt]"
        id="riveCanvas"
        #riveCanvas
      ></canvas>
    </div>
  `,
  styles: [
    `
      .splash-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100svw;
        height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #faf4e4;
        z-index: 9999;
      }
      .loader {
        border: 5px solid #f3f3f3;
        border-radius: 50%;
        border-top: 5px solid #3498db;
        width: 50px;
        height: 50px;
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
export class SplashScreenComponent implements AfterViewInit {
  private riveUrl = 'le_titube.riv';
  @ViewChild('riveCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadRiveAnimation();
    });
  }

  riveInstance: Rive | null = null;

  async loadRiveAnimation() {
    if (this.canvas) {
      try {
        // Initialisation de Rive avec le canvas
        this.riveInstance = new Rive({
          canvas: this.canvas.nativeElement,
          src: this.riveUrl,
          autoplay: true,
          artboard: 'logo',
          onLoad: () => {
            console.log('Rive file loaded!', this.riveInstance?.contents);
            console.log(this.riveInstance?.contents.artboards);
          },
          onLoadError: (error) => {
            console.error('Rive file error:', error);
          },
        });
        this.riveInstance.resizeToCanvas();
        this.riveInstance.resizeDrawingSurfaceToCanvas();
      } catch (error) {
        console.error("Erreur lors du chargement de l'animation Rive:", error);
      }
    }
  }
}
