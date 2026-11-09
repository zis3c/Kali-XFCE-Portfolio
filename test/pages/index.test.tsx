import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import { SESSION_ACTION_EVENT } from '../../utils/session-actions';
import Home from '../../pages/index';
import * as BootStyled from '../../components/BootChooser/BootChooser.styles';
import * as PortfolioStyled from '../../components/PortfolioMode/PortfolioMode.styles';
import PortfolioMode from '../../components/PortfolioMode/PortfolioMode';
import Loader from '../../components/Loader/Loader';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Home title="zis3c@kali" />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

describe('Home', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('starts on the boot chooser', () => {
    const { wrap } = setup();

    expect(wrap.text()).toContain('Portfolio Mode (default)');
    expect(wrap.find(PortfolioMode)).toHaveLength(0);
  });

  it('enters portfolio mode and returns to the chooser', () => {
    const { wrap } = setup();

    wrap.find(BootStyled.Button).at(0).simulate('click');
    wrap.update();
    expect(wrap.find(PortfolioMode)).toHaveLength(1);

    wrap.find(PortfolioStyled.BackButton).simulate('click');
    wrap.update();
    expect(wrap.find(PortfolioMode)).toHaveLength(0);
    expect(wrap.text()).toContain('Portfolio Mode (default)');
  });

  it('boots into Kali mode', () => {
    const { wrap } = setup();

    wrap.find(BootStyled.Button).at(1).simulate('click');
    wrap.update();

    expect(wrap.find(Loader)).toHaveLength(1);
  });

  it('restarts back to the boot menu from a session action', () => {
    const { wrap } = setup();

    wrap.find(BootStyled.Button).at(1).simulate('click');
    wrap.update();

    act(() => {
      window.dispatchEvent(
        new CustomEvent(SESSION_ACTION_EVENT, { detail: 'restart' })
      );
    });
    wrap.update();

    expect(wrap.find(Loader)).toHaveLength(0);
    expect(wrap.text()).toContain('Portfolio Mode (default)');
  });

  it('supports keyboard navigation and BIOS hints on the boot menu', () => {
    const { wrap } = setup();

    wrap.find(BootStyled.Button).at(0).simulate('click');
    wrap.find(PortfolioStyled.BackButton).simulate('click');
    wrap.update();

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    });
    wrap.update();
    expect(wrap.find(BootStyled.Button).at(1).prop('isActive')).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2' }));
    });
    wrap.update();
    expect(wrap.text()).toContain('BIOS setup is protected');

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F8' }));
    });
    wrap.update();
    expect(wrap.text()).toContain('Advanced boot options opened');
  });
});
