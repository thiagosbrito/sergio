import { Directive, Host, Self, Optional, Input, Renderer2, OnInit, ElementRef } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

@Directive({
  selector: '[appCarouselSwipe]'
})
export class AppCarouselSwipeDirective implements OnInit {
  @Input() swipeThreshold = 50;
  private start: number | null | undefined;
  private stillMoving!: boolean;
  private moveListener!: Function | undefined;

  constructor(
    @Host() @Self() @Optional() private carousel: CarouselComponent,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
  }

  ngOnInit(): void {
    if ('ontouchstart' in document.documentElement) {
      this.renderer.listen(this.element.nativeElement, 'touchstart', this.onTouchStart.bind(this));
      this.renderer.listen(this.element.nativeElement, 'touchend', this.onTouchEnd.bind(this));
    }
  }

  private onTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1) {
      this.start = e.touches[0].pageX;
      this.stillMoving = true;
      this.moveListener = this.renderer.listen(this.element.nativeElement, 'touchmove', this.onTouchMove.bind(this));
    }
  }

  private onTouchMove(e: TouchEvent): void {
    if (this.stillMoving) {
      const x = e.touches[0].pageX;
      const difference = this.start as number - x;
      if (Math.abs(difference) >= this.swipeThreshold) {
        this.cancelTouch();
        if (difference > 0) {
          if (this.carousel.activeSlide < this.carousel.slides.length - 1) {
            this.carousel.activeSlide = this.carousel.activeSlide + 1;
          }
        } else {
          if (this.carousel.activeSlide > 0) {
            this.carousel.activeSlide = this.carousel.activeSlide - 1;
          }
        }
      }
    }
  }

  private onTouchEnd(e: TouchEvent): void {
    this.cancelTouch();
  }

  private cancelTouch() {
    if (this.moveListener) {
      this.moveListener();
      this.moveListener = undefined;
    }
    this.start = null;
    this.stillMoving = false;
  }
}
