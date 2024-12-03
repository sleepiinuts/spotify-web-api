import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { SkeletonPlaceholderConfig } from './placeholder.config.type';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent implements OnInit, OnChanges {
  @Input() animation: SkeletonPlaceholderConfig['animation'];
  @Input() count: SkeletonPlaceholderConfig['count'];
  @Input() theme: SkeletonPlaceholderConfig['theme'];
  @Input() loadingText: SkeletonPlaceholderConfig['loadingText'];
  @Input() completeIndexes: number[];
  @Input() id: string;
  loadings!: boolean[];
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) document: Document,
    private vcr: ViewContainerRef,
  ) {
    const {
      animation = 'false',
      count = 1,
      theme = null,
      loadingText = '',
    } = {};

    this.animation = animation;
    this.count = count;
    this.theme = theme;
    this.loadingText = loadingText;

    this.completeIndexes = [];
    this.id = '';

    // console.log(`constructor: ${this.loadings}`);
  }

  toggleIsLoading(idx: number) {
    setTimeout(() => {
      this.loadings[idx] = false;
      document.getElementById(`${idx}`)?.classList.add('show');
      this.cd.detectChanges();
    }, 3000);

    // setTimeout(() => {
    //   this.completeIndexes = [...this.completeIndexes, idx];
    //   console.log(`isLoading: ${this.loadings}`);
    //   this.cd.detectChanges();
    // }, 3000);
  }

  getId(idx: number): string {
    return `${this.id}-${idx}`;
  }

  ngOnInit(): void {
    // initialize value received through @input
    this.loadings = Array.from({ length: this.count }, () => true);
    // console.log(`onInit: ${this.loadings}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(`onChange: ${this.loadings}`);

    if (
      changes['completeIndexes']?.previousValue !==
      changes['completeIndexes']?.currentValue
    ) {
      this.completeIndexes.forEach((idx) => {
        console.log(`toggle placeholder id: ${idx}`);
        document.getElementById(`${this.id}-${idx}`)?.classList.add('hide');
        // this.el.nativeElement.querySelector(`${idx}`).classList.add('hide');
      });

      document.getElementById(`skeleton-${this.id}`)?.classList.add('hide');
      this.vcr.clear(); //how to remove self from dom ??
    }
  }
}
