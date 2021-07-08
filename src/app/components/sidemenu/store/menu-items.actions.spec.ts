import * as fromMenuItems from './menu-items.actions';

describe('loadMenuItemss', () => {
  it('should return an action', () => {
    expect(fromMenuItems.loadMenuItemss().type).toBe('[MenuItems] Load MenuItemss');
  });
});
