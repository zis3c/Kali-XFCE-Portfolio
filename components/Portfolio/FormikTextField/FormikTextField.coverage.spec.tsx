import { mount } from 'enzyme';
import React from 'react';
import { Formik } from 'formik';
import FormikTextField from './FormikTextField';
import { withReduxAndStyledProviders } from '../../../test/testUtils';

describe('FormikTextField coverage', () => {
  it('renders the validation error when touched', () => {
    const wrap = mount(
      withReduxAndStyledProviders(
        <Formik
          initialValues={{ email: '' }}
          initialErrors={{ email: 'Email is required' }}
          initialTouched={{ email: true }}
          onSubmit={jest.fn()}
        >
          <form>
            <FormikTextField placeholder="email" name="email" type="email" />
          </form>
        </Formik>
      )
    );

    expect(wrap.text()).toContain('Email is required');
  });
});
