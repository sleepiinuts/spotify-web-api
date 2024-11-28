import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[image-placeholder]',
  standalone: true,
})
export class ImagePlaceHolderDirective implements OnInit, AfterViewInit {
  @Input('loading') loading: string = '';

  // @HostListener('load') onLoad() {
  //   this.renderer.setAttribute(
  //     this.el.nativeElement,
  //     'src',
  //     this.el.nativeElement.src,
  //   );

  //   // console.log(`working-class: ${this.loading}`);
  // }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      'img_placeholder.jpg',
    );
    // console.log(`image src-constructor: ${this.el.nativeElement.src}`);
    // console.log(`loading-constructor: ${this.loading}`);

    this.renderer.addClass(this.el.nativeElement, 'skeleton');
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'loaded');
  }

  ngOnInit(): void {
    // console.log(`this.loading-oninit: ${this.loading}`);
    // console.log(`image src: ${this.el.nativeElement.src}`);
    // fromEvent(this.el.nativeElement, 'load')
    //   .pipe(distinctUntilChanged())
    //   .subscribe(() => {
    //     console.log('done loading...');
    //     this.renderer.setAttribute(
    //       this.el.nativeElement,
    //       'src',
    //       this.el.nativeElement.src,
    //     );
    //   });
  }
}
