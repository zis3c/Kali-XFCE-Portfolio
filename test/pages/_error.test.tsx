import { shallow } from 'enzyme';
import type { NextPageContext } from 'next';
import React from 'react';
import ErrorPage from '../../pages/_error';

describe('ErrorPage', () => {
  it('uses the 404 copy', () => {
    const wrap = shallow(<ErrorPage statusCode={404} />);

    expect(wrap.text()).toContain('404');
    expect(wrap.text()).toContain('secret door');
  });

  it('uses the 500 copy', () => {
    const wrap = shallow(<ErrorPage statusCode={500} />);

    expect(wrap.text()).toContain('500');
    expect(wrap.text()).toContain('mamak');
  });

  it('falls back to generic copy for other status codes', () => {
    const wrap = shallow(<ErrorPage statusCode={418} />);

    expect(wrap.text()).toContain('418');
    expect(wrap.text()).toContain('parkour');
  });

  it('derives the status code from the response', () => {
    const result = ErrorPage.getInitialProps({
      res: { statusCode: 503 },
    } as unknown as NextPageContext);
    expect(result).toEqual({ statusCode: 503 });
  });

  it('derives the status code from the error', () => {
    const result = ErrorPage.getInitialProps({
      err: { statusCode: 500 },
    } as unknown as NextPageContext);
    expect(result).toEqual({ statusCode: 500 });
  });
});
