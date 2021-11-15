import React, { FC, useState, useEffect } from 'react'
import { Button, Breadcrumb, TabMenu } from '@pabau/ui'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import Layout from '../../../components/Layout/Layout'
import { Typography, Input } from 'antd'
import CommonHeader from '../../../components/CommonHeader'
import { PathwaysCard } from '../../../components/Setup/CarePathways'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import {
  useGetCarePathwaysQuery,
  GetCarePathwaysDocument,
  useUpdateCarePathwaysOrderMutation,
} from '@pabau/graphql'
import styles from './index.module.less'
import { MenuOutlined } from '@ant-design/icons'

const { Title } = Typography

enum Tab {
  Pathways = '0',
  Library = '1',
}

const DragHandle = SortableHandle(() => <MenuOutlined />)

const SortableItem = SortableElement((props) => {
  const { value: pathway } = props
  return (
    <PathwaysCard
      key={pathway?.id}
      icon=""
      title={pathway?.pathway_name}
      count={pathway?.count}
      description={pathway?.description}
      loading={false}
    >
      <DragHandle />
    </PathwaysCard>
  )
})

const SortableList = SortableContainer((props) => {
  const { items, ...restProps } = props
  return (
    <div className={styles.customCardWrapper}>
      {items.map((item, index) => (
        <SortableItem
          key={item?.id}
          index={index}
          value={item}
          {...restProps}
        />
      ))}
    </div>
  )
})

interface PathwayObject {
  id: number
  pathway_name: string
  description: string
  order: number
  count: number
}

export const Index: FC = () => {
  const [currentTab, setCurrentTab] = useState('0')
  const [pathwaysList, setPathwaysList] = useState<PathwayObject[]>()
  const { t } = useTranslationI18()

  const { data, loading } = useGetCarePathwaysQuery()

  const [updateOrderMutation] = useUpdateCarePathwaysOrderMutation()

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]

    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return JSON.parse(JSON.stringify(result))
  }

  const updateOrder = async (values) => {
    if (values?.id) {
      await updateOrderMutation({
        variables: {
          id: values.id,
          order: values.order,
        },
        refetchQueries: [{ query: GetCarePathwaysDocument }],
      })
    }
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const items = reorder(pathwaysList, oldIndex, newIndex)
    let isCustomOrder = false
    for (const item of pathwaysList) {
      if (item.order === 0) {
        isCustomOrder = true
      }
    }
    if (isCustomOrder) {
      const totalRecord = pathwaysList.length
      const lastOrderValue = pathwaysList?.[0].order
      const newData = []
      for (const [index, item] of items.entries()) {
        newData.push({
          ...item,
          order: lastOrderValue + totalRecord - index,
        })
      }
      for (let i = 0; i <= newData.length; i++) {
        updateOrder(newData[i])
      }
      setPathwaysList(newData)
    } else {
      const newData = items.map((pathway: any, i) => {
        pathway.order = pathwaysList[i].order
        return pathway
      })
      if (oldIndex > newIndex) {
        for (let i = newIndex; i <= oldIndex; i++) {
          updateOrder(newData[i])
        }
      } else {
        for (let i = oldIndex; i <= newIndex; i++) {
          updateOrder(newData[i])
        }
      }
      setPathwaysList(newData)
    }
  }

  useEffect(() => {
    if (data?.findManyPathway && !loading) {
      const pathwayData = [...data.findManyPathway]?.map((item) => {
        return {
          id: item.id,
          count: item?._count?.PathwayStep,
          pathway_name: item.pathway_name,
          description: item.description,
          order: item.order,
        }
      })
      setPathwaysList([...pathwayData])
    }
  }, [data, loading])

  return (
    <Layout>
      <div className={styles.carePathwaysContainer}>
        <div className={styles.desktopViewNone}>
          <CommonHeader
            title={t('setup.medical.forms.patientFormName')}
            isLeftOutlined
            reversePath="/setup"
            isShowSearch
          />
        </div>
        <div className={styles.carePathwaysHeader}>
          <div>
            <Breadcrumb
              items={[
                {
                  breadcrumbName: t('navigation-breadcrumb-setup'),
                  path: 'setup',
                },
                {
                  breadcrumbName: t('setup.care-pathways.breadcrum.pathname'),
                  path: '',
                },
              ]}
            />
            <Title>{t('setup.care-pathways.page.title')}</Title>
          </div>
          <div className={styles.carePathwaysOps}>
            {currentTab === Tab.Pathways && (
              <div className={styles.ButtonTb}>
                <Button type="primary">
                  {t('setup.care-pathways.create-pathway.button')}
                </Button>
              </div>
            )}
            {currentTab === Tab.Library && (
              <Input placeholder={t('setup.medical.forms.searchLibrary')} />
            )}
          </div>
        </div>

        <TabMenu
          tabPosition="top"
          minHeight="1px"
          menuItems={[
            t('setup.care-pathways.tabs.pathways'),
            t('setup.care-pathways.tabs.library'),
          ]}
          onTabClick={(key) => setCurrentTab(key)}
        >
          <div className={styles.container}>
            {loading ? (
              <div className={styles.customCardWrapper}>
                {[...Array.from({ length: 6 })].map((value, index) => {
                  return (
                    <PathwaysCard
                      loading={true}
                      key={index}
                      icon=""
                      title={''}
                      count={0}
                      description={''}
                    ></PathwaysCard>
                  )
                })}
              </div>
            ) : (
              pathwaysList?.length > 0 && (
                <SortableList
                  useDragHandle
                  axis="xy"
                  items={pathwaysList}
                  onSortEnd={onSortEnd}
                />
              )
            )}
          </div>

          <div></div>
        </TabMenu>
      </div>
    </Layout>
  )
}

export default Index
