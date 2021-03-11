import React, { FC, useState } from 'react'
import CheckboxTree, { CheckboxTreeProps } from './CheckboxTree'
import { treeData } from './mock'

export default {
  component: CheckboxTree,
  title: 'UI/CheckboxTree',
  args: {
    treeData,
  },
  argTypes: {
    treeData: { control: { type: 'object' } },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const CheckboxTreeStory: FC<CheckboxTreeProps> = ({ treeData }) => {
  const [expandedKeys, setExpandedKeys] = useState(['Accent prime'])
  const [checkedKeys, setCheckedKeys] = useState([
    'Accent prime - Subcategory 1',
  ])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: string[]) => {
    setCheckedKeys(checkedKeysValue)
  }

  return (
    <CheckboxTree
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={treeData}
    />
  )
}
