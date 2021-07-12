import * as fromGallery from './gallery.actions';

describe('loadGallerys', () => {
  it('should return an action', () => {
    expect(fromGallery.loadGallerys().type).toBe('[Gallery] Load Gallerys');
  });
});
