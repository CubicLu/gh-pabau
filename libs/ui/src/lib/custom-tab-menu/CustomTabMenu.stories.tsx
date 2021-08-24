import React, { FC } from 'react'
import CustomTabMenu, { CustomTabMenuProps } from './CustomTabMenu'

export default {
  component: CustomTabMenu,
  title: 'UI/CustomTabMenu',
}

const CustomTabMenuStory: FC<CustomTabMenuProps> = ({ ...args }) => (
  <div style={{ width: '800px', border: '1px solid var(--border-color-base)' }}>
    <CustomTabMenu {...args}>
      <div>Dashboard Tab Pane</div>
      <div>Appointments Tab Pane</div>
      <div>Financials Tab Pane</div>
      <div>Packages Tab Pane</div>
      <div>Communications Tab Pane</div>
      <div>EMR Tab Pane 1</div>
      <div>EMR Tab Pane 2</div>
      <div>EMR Tab Pane 3</div>
      <div>EMR Tab Pane 4</div>
      <div>EMR Tab Pane 5</div>
      <div>EMR Tab Pane 6</div>
    </CustomTabMenu>
  </div>
)

export const LeftPositionTabMenu = CustomTabMenuStory.bind({})
LeftPositionTabMenu.args = {
  tabPosition: 'left',
  minHeight: '750px',
  tabWidth: '200px',
  tabItems: [
    {
      key: 0,
      content: 'Dashboard',
    },
    {
      key: 1,
      content: 'Appointments',
    },
    {
      key: 2,
      content: 'Financials',
    },
    {
      key: 3,
      content: 'Packages',
    },
    {
      key: 4,
      content: 'Communications',
    },
    {
      key: 5,
      content: 'EMR',
      children: [
        {
          key: 5,
          content: 'EMR 1',
        },
        {
          key: 6,
          content: 'EMR 2',
        },
        {
          key: 7,
          content: 'EMR 3',
        },
        {
          key: 8,
          content: 'EMR 4',
        },
        {
          key: 9,
          content: 'EMR 5',
        },
        {
          key: 10,
          content: 'EMR 6',
        },
      ],
    },
  ],
}

export const TopPositionTabMenu = CustomTabMenuStory.bind({})
TopPositionTabMenu.args = {
  tabPosition: 'top',
  tabWidth: '160px',
  tabItems: [
    {
      key: 0,
      content: 'Dashboard',
    },
    {
      key: 1,
      content: 'Appointments',
    },
    {
      key: 2,
      content: 'Financials',
    },
    {
      key: 3,
      content: 'Packages',
    },
    {
      key: 4,
      content: 'Communications',
    },
    {
      key: 5,
      content: 'EMR',
      children: [
        {
          key: 5,
          content: 'EMR 1',
        },
        {
          key: 6,
          content: 'EMR 2',
        },
        {
          key: 7,
          content: 'EMR 3',
        },
        {
          key: 8,
          content: 'EMR 4',
        },
        {
          key: 9,
          content: 'EMR 5',
        },
        {
          key: 10,
          content: 'EMR 6',
        },
      ],
    },
  ],
}
