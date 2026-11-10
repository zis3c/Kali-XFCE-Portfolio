import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../../test/testUtils';
import { featuredProjects } from '../PortfolioMode.data';
import ProjectsSection from './ProjectsSection';
import * as Styled from '../PortfolioMode.styles';

const setup = (overrides: Record<string, unknown> = {}) => {
  const setProjectFilter = jest.fn();
  const setFocusedProjectIndex = jest.fn();
  const props = {
    filteredProjects: featuredProjects,
    projectFilter: 'All' as const,
    setProjectFilter,
    repoStats: {
      cloudsentinel: { stars: 12, forks: 3 },
      redlilygo: { stars: 0, forks: 0 },
    },
    focusedProjectIndex: 0,
    setFocusedProjectIndex,
    ...overrides,
  };
  const wrap = mount(
    withReduxAndStyledProviders(<ProjectsSection {...props} />)
  );
  return { wrap, setProjectFilter, setFocusedProjectIndex };
};

describe('ProjectsSection', () => {
  it('filters projects', () => {
    const { wrap, setProjectFilter } = setup();

    wrap
      .find(Styled.FilterChip)
      .filterWhere((node) => node.text() === 'Security')
      .simulate('click');

    expect(setProjectFilter).toHaveBeenCalledWith('Security');
  });

  it('focuses a project card', () => {
    const { wrap, setFocusedProjectIndex } = setup();

    wrap.find(Styled.ProjectCard).at(2).simulate('click');

    expect(setFocusedProjectIndex).toHaveBeenCalledWith(2);
  });

  it('shows live GitHub stats when available', () => {
    const { wrap } = setup();
    const firstCard = wrap.find(Styled.ProjectCard).at(0);

    expect(firstCard.text()).toContain('12');
    expect(firstCard.text()).toContain('3');
  });

  it('resets to all projects from the empty state', () => {
    const { wrap, setProjectFilter } = setup({
      filteredProjects: [],
      projectFilter: 'Security',
    });

    expect(wrap.text()).toContain('No projects match');
    wrap
      .find('button')
      .filterWhere((node) => node.text() === 'Show All Projects')
      .simulate('click');

    expect(setProjectFilter).toHaveBeenCalledWith('All');
  });
});
