import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
export class PlaceholderComponent implements OnInit {
  @Input() animation: SkeletonPlaceholderConfig['animation'];
  @Input() count: SkeletonPlaceholderConfig['count'];
  @Input() theme: SkeletonPlaceholderConfig['theme'];
  @Input() loadingText: SkeletonPlaceholderConfig['loadingText'];
  items!: any[];
  constructor() {
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
  }

  ngOnInit(): void {
    // initialize value received through @input
    this.items = new Array(this.count);

    // console.log(`animation: ${this.animation}`);
  }
}
