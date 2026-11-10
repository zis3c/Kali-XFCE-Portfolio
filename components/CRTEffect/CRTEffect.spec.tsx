import { shallow } from 'enzyme';
import CRTEffect from './CRTEffect';

describe('CRTEffect', () => {
  it('is disabled', () => {
    expect(shallow(<CRTEffect />).isEmptyRender()).toBe(true);
  });
});
