import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../../test/testUtils';
import { ctfCompetitions } from '../PortfolioMode.data';
import * as Styled from '../PortfolioMode.styles';
import JourneySection from './JourneySection';

const setup = () => mount(withReduxAndStyledProviders(<JourneySection />));

const clickFilter = (wrap: ReturnType<typeof mount>, label: string) =>
  wrap
    .find(Styled.CtfTabButton)
    .filterWhere((node) => node.text().includes(label))
    .simulate('click');

describe('JourneySection', () => {
  it('renders every CTF competition by default', () => {
    const wrap = setup();

    expect(wrap.find(Styled.CtfCard)).toHaveLength(ctfCompetitions.length);
    expect(wrap.text()).toContain('TAMiNG iCTFF8 UiTM');
  });

  it('filters national competitions', () => {
    const wrap = setup();
    clickFilter(wrap, 'National');

    const expected = ctfCompetitions.filter(
      (competition) => competition.level === 'National'
    );
    expect(wrap.find(Styled.CtfCard)).toHaveLength(expected.length);
  });

  it('filters international competitions', () => {
    const wrap = setup();
    clickFilter(wrap, 'Global');

    const expected = ctfCompetitions.filter(
      (competition) => competition.level === 'International'
    );
    expect(wrap.find(Styled.CtfCard)).toHaveLength(expected.length);
  });

  it('filters Dot Zero team events', () => {
    const wrap = setup();
    clickFilter(wrap, 'Dot Zero');

    const expected = ctfCompetitions.filter(
      (competition) => competition.type === 'Dot Zero'
    );
    expect(wrap.find(Styled.CtfCard)).toHaveLength(expected.length);
  });

  it('filters solo events', () => {
    const wrap = setup();
    clickFilter(wrap, 'Solo');

    const expected = ctfCompetitions.filter(
      (competition) => competition.type === 'Solo'
    );
    expect(wrap.find(Styled.CtfCard)).toHaveLength(expected.length);
  });

  it('returns to all competitions', () => {
    const wrap = setup();
    clickFilter(wrap, 'Solo');
    clickFilter(wrap, 'All');

    expect(wrap.find(Styled.CtfCard)).toHaveLength(ctfCompetitions.length);
  });
});
