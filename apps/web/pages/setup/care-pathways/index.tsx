import React, { FC, useState, useEffect } from 'react'
import { Breadcrumb, TabMenu } from '@pabau/ui'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import Layout from '../../../components/Layout/Layout'
import { Typography } from 'antd'
// import dayjs from 'dayjs'
// import Custom from '../../../components/MedicalForms/Custom'
// import Library from '../../../components/MedicalForms/Library'
import CommonHeader from '../../../components/CommonHeader'
import { PathwaysCard } from '../../../components/Setup/CarePathways'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useGetCarePathwaysQuery } from '@pabau/graphql'
import styles from './index.module.less'
import { MenuOutlined } from '@ant-design/icons'
const { Title } = Typography

// enum Tab {
//   Pathways = '0',
//   Library = '1',
// }

export const Index: FC = () => {
  const [currentTab, setCurrentTab] = useState('0')
  const [pathwaysList, setPathwaysList] = useState([])
  const { t } = useTranslationI18()

  const { data, loading } = useGetCarePathwaysQuery({})

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const items = reorder(
      pathwaysList,
      result.source.index,
      result.destination.index
    )

    setPathwaysList(items)
  }
  //TODO: remove it
  console.log('currentTab', currentTab)
  useEffect(() => {
    if (data?.findManyPathway) {
      setPathwaysList(data.findManyPathway)
    }
  }, [data])

  return (
    <Layout>
      <div className={styles.carePathwaysContainer}>
        <div className={styles.desktopViewNone}>
          <CommonHeader
            title={t('setup.medical.forms.patientFormName')}
            isLeftOutlined
            reversePath="/setup"
            isShowSearch
          ></CommonHeader>
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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {loading
                      ? [...Array.from({ length: 6 })].map((value, index) => {
                          return (
                            <PathwaysCard
                              key={index}
                              icon=""
                              title=""
                              count={index}
                              description=""
                            />
                          )
                        })
                      : pathwaysList.length > 0 &&
                        pathwaysList.map((pathway, index) => {
                          return (
                            <Draggable
                              key={pathway.id}
                              draggableId={pathway.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <PathwaysCard
                                    key={pathway.id}
                                    icon=""
                                    title={pathway.pathway_name}
                                    count={pathway._count.PathwayStep}
                                    description={pathway.description}
                                  >
                                    <MenuOutlined
                                      {...provided.dragHandleProps}
                                    />
                                  </PathwaysCard>
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div></div>
        </TabMenu>
      </div>
    </Layout>
  )
}

export default Index
