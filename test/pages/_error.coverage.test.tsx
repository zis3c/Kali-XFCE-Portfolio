import { shallow } from 'enzyme';
import type { NextPageContext } from 'next';
import React from 'react';
import ErrorPage from '../../pages/_error';

describe('ErrorPage coverage', () => {
  it('defaults to 404 when no context is provided', () => {
    const result = ErrorPage.getInitialProps({} as NextPageContext);

    expect(result).toEqual({ statusCode: 404 });
  });

  it('reads the error status when there is no response', () => {
    const result = ErrorPage.getInitialProps({
      err: { statusCode: 500 },
    } as unknown as NextPageContext);

    expect(result).toEqual({ statusCode: 500 });
  });

  it('uses the fallback copy for unknown codes', () => {
    const wrap = shallow(<ErrorPage statusCode={418} />);

    expect(wrap.text()).toContain('parkour');
  });
});
