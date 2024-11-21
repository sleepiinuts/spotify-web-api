import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global Injection window', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window;
    } else {
      return new Window();
    }
  },
});
