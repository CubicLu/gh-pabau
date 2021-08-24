import { ContactsOutlined } from '@ant-design/icons'
import { action } from '@storybook/addon-actions'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useEffect, useState } from 'react'
import { data } from './mock'
import { Table } from './Table'

const padlocked = ['Book Now Link', 'Instagram', 'Facebook']

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'STATUS',
    dataIndex: 'is_active',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: '',
    dataIndex: 'visibleData',
    className: 'drag-visible',
    visible: true,
    isHover: true,
  },
] as ColumnsType

export default {
  component: Table,
  title: 'Basics/Table',
  args: {
    draggable: true,
    dataSource: data,
    columns,
    padlocked,
    noDataText: 'rota templates',
    noDataBtnText: 'Rota Templete',
  },
  argTypes: {
    draggable: { control: { type: 'boolean' } },
  },
}

const DragFeatureStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState(data)
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }
  return (
    <Table
      {...args}
      padlocked={[]}
      dataSource={dataSource}
      updateDataSource={updateDataSource}
    />
  )
}
export const TableWithDragFeature = DragFeatureStory.bind({})

const NoDragFeatureStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState(data)
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }
  return (
    <Table
      {...args}
      padlocked={[]}
      draggable={false}
      dataSource={dataSource}
      updateDataSource={updateDataSource}
    />
  )
}
export const TableWithNoDragFeature = NoDragFeatureStory.bind({})

const TableWithReservedWordsStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState(data)
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }

  return (
    <Table
      {...args}
      dataSource={dataSource}
      updateDataSource={updateDataSource}
    />
  )
}
export const TableWithReservedWords = TableWithReservedWordsStory.bind({})

const TableWithCustomColorStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState(data)
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }

  return (
    <Table
      {...args}
      padlocked={[]}
      dataSource={dataSource}
      isCustomColorExist={true}
      updateDataSource={updateDataSource}
    />
  )
}
export const TableWithCustomColor = TableWithCustomColorStory.bind({})

const TableWithCustomIconStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState(data)
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }

  return (
    <Table
      {...args}
      padlocked={[]}
      dataSource={dataSource}
      isCustomIconExist={true}
      updateDataSource={updateDataSource}
    />
  )
}
export const TableWithCustomIcon = TableWithCustomIconStory.bind({})

const TableWithNoDataStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState([])
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }

  return (
    <div style={{ border: '1px solid var(--light-grey-color)' }}>
      <Table
        {...args}
        padlocked={[]}
        dataSource={dataSource}
        isCustomColorExist={true}
        updateDataSource={updateDataSource}
        noDataIcon={<ContactsOutlined />}
      />
    </div>
  )
}
export const TableWithNoData = TableWithNoDataStory.bind({})

const TableWithHoverFeatureStory: FC = ({ ...args }) => {
  const [dataSource, setDataSource] = useState(data)
  const updateDataSource = ({ newData, oldIndex, newIndex }) => {
    setDataSource(newData)
  }

  const renderVisibleData = () => {
    return (
      <Button
        style={{
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
        }}
        onClick={action('onButtonClicked')}
      >
        Share
      </Button>
    )
  }

  useEffect(() => {
    if (data.length > 0) {
      const resultData = dataSource.map((item) => {
        return { ...item, visibleData: renderVisibleData() }
      })
      setDataSource(resultData)
    }
  }, [dataSource])

  const onHoverEnterHandle = (value) => {
    const result = dataSource.map((itemList) => {
      if (itemList.key === value.key) {
        return { ...itemList, isShow: true }
      }
      return { ...itemList, isShow: false }
    })
    setDataSource(result)
  }

  const onHoverLeaveHandle = () => {
    const resultData = dataSource.map((itemList) => {
      return { ...itemList, isShow: false }
    })
    setDataSource(resultData)
  }

  return (
    <div style={{ border: '1px solid var(--light-grey-color)' }}>
      <Table
        {...args}
        padlocked={[]}
        dataSource={dataSource}
        isHover={true}
        draggable={false}
        onRowHover={onHoverEnterHandle}
        onLeaveRow={onHoverLeaveHandle}
        updateDataSource={updateDataSource}
        noDataIcon={<ContactsOutlined />}
      />
    </div>
  )
}
export const TableWithHoverFeature = TableWithHoverFeatureStory.bind({})
