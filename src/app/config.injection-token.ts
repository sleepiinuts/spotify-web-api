import { InjectionToken } from '@angular/core';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const WINDOW = new InjectionToken<Window>('Global Injection window', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window;
    } else {
      return new Window();
    }
  },
});

export const SPOTIFY_SDK = new InjectionToken<SpotifyApi>(
  'Global Injection for spotify sdk'
);
