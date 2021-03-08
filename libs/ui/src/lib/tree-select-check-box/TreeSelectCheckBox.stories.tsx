import React from 'react'
import TreeSelectCheckBox, {
  TreeSelectCheckBoxProps,
} from './TreeSelectCheckBox'

const arrangeTitle = (
  title: string | number | JSX.Element = '',
  subTitle: string | number | JSX.Element = ''
) => {
  return (
    <span className="title">
      <span className="main">{title}</span>
      {subTitle && (
        <span className="sub" style={{ marginTop: '2.5px' }}>
          {subTitle}
        </span>
      )}
    </span>
  )
}

const treeData = [
  {
    title: arrangeTitle('Seasonal Offers (8)'),
    key: 2,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 2.1,
      },
      {
        title: arrangeTitle('2 ml contour', '1h'),
        key: 2.2,
      },
      {
        title: arrangeTitle('1 ml filler', '1h 25min'),
        key: 2.3,
      },
    ],
  },
  {
    title: arrangeTitle('Special Offers (12)'),
    key: 3,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 3.1,
      },
    ],
  },
  {
    title: arrangeTitle('Face Services (23)'),
    key: 4,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 4.1,
      },
    ],
  },
  {
    title: arrangeTitle('Body Services (23)'),
    key: 5,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 5.1,
      },
    ],
  },
  {
    title: arrangeTitle('Hair Services (23)'),
    key: 6,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 6.1,
      },
    ],
  },
]

export default {
  title: 'UI/TreeSelectCheckbox',
  component: TreeSelectCheckBox,
}

const TreeSelectCheckBoxStory = ({ ...args }: TreeSelectCheckBoxProps) => (
  <TreeSelectCheckBox {...args} />
)

export const Basic = TreeSelectCheckBoxStory.bind({})
Basic.args = {
  modalTitle: 'Select Services',
  data: treeData,
  visible: true,
  inputPlaceholder: 'Search Services',
  defaultExpandedAll: true,
  modalWidth: 800,
}
