import expect from 'expect';
import rootReducer, { initState } from '../../../redux/reducers';

describe('reducers', () => {
  it('should return the initial state', () => {
    const state = {
      base: rootReducer.base,
      searchPage: rootReducer.searchPage
    }
    expect(rootReducer(undefined, { type: 'A' })).not.toBeNull();
  })
})