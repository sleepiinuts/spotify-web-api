export interface SearchTrackResp {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  item: Track[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string; ean: string; upc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: any;
  reastrictions: { reason: 'market' | 'product' | 'explicit' };
  name: string;
  popularity: number;
  preview_url: string | undefined;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions?: { reason: string };
  type: string;
  uri: string;
  artists: Artist[];
}

export interface Artist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
