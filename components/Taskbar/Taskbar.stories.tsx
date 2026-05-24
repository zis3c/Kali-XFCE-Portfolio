import { Story } from '@storybook/react';
import Taskbar, { TaskbarProps } from './Taskbar';

export default {
  title: 'UI/Taskbar',
  component: Taskbar,
};

const Template: Story<TaskbarProps> = (args) => <Taskbar {...args} />;

export const Primary = Template.bind({});
Primary.args = { activeWorkspace: 1, onWorkspaceChange: () => { console.log('workspace changed'); } };
