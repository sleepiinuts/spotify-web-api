import { ListArtistsPipe } from './list-artists.pipe';

describe('ListArtistsPipe', () => {
  it('create an instance', () => {
    const pipe = new ListArtistsPipe();
    expect(pipe).toBeTruthy();
  });
});
