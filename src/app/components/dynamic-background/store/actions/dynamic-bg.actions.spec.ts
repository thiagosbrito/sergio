import * as fromDynamicBG from './dynamic-bg.actions';

describe('loadDynamicBGs', () => {
  it('should return an action', () => {
    expect(fromDynamicBG.loadDynamicBGs().type).toBe('[DynamicBG] Load DynamicBGs');
  });
});
