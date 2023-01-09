import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

type HtmlElementEvent = Event & { target: HTMLInputElement };

@Directive({
  standalone: true,
  selector: '[flexInput]',
})
export class FlexInputDirective implements OnInit, OnDestroy {
  private elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  private renderer = inject(Renderer2);
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    const input = fromEvent<HtmlElementEvent>(
      this.elementRef.nativeElement,
      'input'
    );
    const defaultWidth = this.elementRef.nativeElement.scrollWidth;

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'width',
      `${defaultWidth}px`
    );

    this.subscription = input.subscribe((event) => {
      const element = event.target;
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'width',
        `${defaultWidth}px`
      );

      if (element.clientWidth !== element.scrollWidth) {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'width',
          `${element.scrollWidth}px`
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
