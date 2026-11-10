import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../../test/testUtils';
import { mockReduxStore } from '../../../test/mockReduxStore';
import { useSystemDesign } from '../../../design-system/useSystemDesign';
import TrashBin from './TrashBin';
import DesktopButton from '../../DesktopButton/DesktopButton';

const { darkTheme } = useSystemDesign();

describe('TrashBin coverage', () => {
  it('renders apps that were deleted from the desktop', () => {
    const store = storeFactory({
      ...mockReduxStore,
      ui: {
        ...mockReduxStore.ui,
        removedApps: ['Terminal'],
      },
    });

    const wrap = mount(
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <TrashBin />
        </Provider>
      </ThemeProvider>
    );

    expect(wrap.find(DesktopButton)).toHaveLength(1);
    expect(wrap.text()).toContain('Terminal');
  });
});
