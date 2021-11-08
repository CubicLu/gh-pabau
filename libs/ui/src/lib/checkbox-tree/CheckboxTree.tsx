import React, { FC, ReactNode } from 'react'
import { Tree } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import style from './CheckboxTree.module.less'

export interface TreeDataType {
  title: string | ReactNode
  key: string | number
  children?: TreeDataType[]
}
export interface CheckboxTreeProps extends TreeProps {
  treeData: TreeDataType[]
  expandedKeys?: string[]
  checkedKeys: (string | number)[]
  onExpand?: (value: string[]) => void
  onCheck?: (value: string[]) => void
  autoExpandParent?: boolean
  defaultExpandAll?: boolean
  showIcon?: boolean
  blockNode?: boolean
  showLine?: boolean
  switcherIcon?: JSX.Element
  checkable?: boolean
}

export const CheckboxTree: FC<CheckboxTreeProps> = ({
  treeData,
  onCheck,
  onExpand,
  autoExpandParent,
  checkedKeys,
  checkable = true,
  ...props
}) => {
  return (
    <div className={style.checkboxTreeWrapper}>
      <Tree
        className={style.treeCheckbox}
        checkable={checkable}
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
        {...props}
      />
    </div>
  )
}

export default CheckboxTree
