import { InjectionToken } from '@angular/core';

export type SkeletonPlaceholderTheme = {
  [k: string]: any;
} | null;

export interface SkeletonPlaceholderConfig {
  animation: 'pulse' | 'false' | false;
  theme: SkeletonPlaceholderTheme;
  loadingText: string;
  count: number;
}

export const SKELETON_LOADER_CONFIG =
  new InjectionToken<SkeletonPlaceholderConfig>(
    'global skeleton loader config',
  );
