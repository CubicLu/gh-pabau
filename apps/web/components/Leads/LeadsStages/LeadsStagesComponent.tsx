import React, { useState, FC, useEffect, useRef, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { KanbanCard } from '@pabau/ui'
import {
  useGetKanbanLeadsLazyQuery,
  useGetStagesLazyQuery,
} from '@pabau/graphql'
import styles from './LeadsStages.module.less'
import LeadsSkeleton from './LeadsSkeleton'
import LeadsStagesSkeleton from './LeadsStagesSkeleton'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'

export interface leadsStagesComponentProps {
  isLoading: boolean
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const move = (
  source,
  destination = [],
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}
const grid = 4

const getItemStyle = (isDragging, draggableStyle) => ({
  padding: `0 ${grid * 1} ${grid * 1}`,
  margin: `0 0 ${grid}px 0`,
  width: `100%`,
  gap: '15px',
  background: isDragging ? 'white' : '',
  ...draggableStyle,
})

const LeadsStagesComponent = () => {
  const leadsStagesRef = useRef<HTMLDivElement>(null)
  const dragableWrapperRef = useRef<HTMLDivElement>(null)
  const [allStages, setAllStages] = useState([])
  const [leadsDefaultParams] = useState({
    limit: 10,
    skip: 0,
  })
  const [leadsState, setLeadsState] = useState({})
  const [isLeadMove, setIsLeadMove] = useState(false)

  const [
    getAllKanbanStages,
    {
      called: calledGetAllStages,
      loading: isLoadingGetAllStages,
      data: getAllStagesData,
      error: getAllStagesError,
    },
  ] = useGetStagesLazyQuery()

  const [
    getAllKanbanLeadsDetails,
    {
      called: calledGetAllLeadsDetail,
      loading: isLoadingGetAllLeadsDetail,
      data: getAllLeadsDetailData,
      error: getAllLeadsError,
    },
  ] = useGetKanbanLeadsLazyQuery({ fetchPolicy: 'network-only' })

  const groupByPipelineId = (arr, parentObj, childObj, property) => {
    const shouldNotBeEmpty = (obj) => {
      return obj && obj !== `null` && obj !== `undefined`
    }

    return arr.reduce(function (memo, x) {
      if (
        shouldNotBeEmpty(x[parentObj]) &&
        shouldNotBeEmpty(x[parentObj][childObj]) &&
        shouldNotBeEmpty(x[parentObj][childObj][property])
      ) {
        if (!memo[x[parentObj][childObj][property]]) {
          memo[x[parentObj][childObj][property]] = []
        }
        memo[x[parentObj][childObj][property]].push(x)
      }
      return memo
    }, {})
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    let newState = {}
    if (!destination) {
      return
    }

    const sInd = +source.droppableId
    const dInd = +destination.droppableId
    if (sInd === dInd) {
      const items = reorder(leadsState[sInd], source.index, destination.index)
      newState = { ...leadsState }
      newState[sInd] = items as []
      setLeadsState(newState)
      setIsLeadMove(true)
    } else {
      const result = move(
        leadsState[sInd],
        leadsState[dInd],
        source,
        destination
      )

      newState = { ...leadsState }
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      setLeadsState(newState)
      setIsLeadMove(true)
    }
  }

  const scrollAtBottomAndLoadMoreLeads = useCallback(() => {
    const stagesElement = leadsStagesRef?.current
    const dragableWrapperElement = dragableWrapperRef?.current
    if (stagesElement && dragableWrapperElement) {
      const scrollReachAtElement = stagesElement.getBoundingClientRect().top
      const stageElementStartedAt = stagesElement.offsetHeight

      if (stageElementStartedAt >= scrollReachAtElement)
        dragableWrapperElement.style.position = `sticky`
    }
  }, [])

  const findStatusOfActivity = (activitys) => {
    if (activitys.length === 0) return 'no activity scheduled'
    else {
      for (const activity of activitys) {
        if (
          new Date(activity.due_start_date) < new Date() &&
          activity.status.toLowerCase() === 'pending'
        ) {
          return 'activity overdue'
        } else if (
          new Date(activity.due_start_date) > new Date() &&
          new Date(activity.due_start_date).getDate() ===
            new Date().getDate() &&
          activity.status.toLowerCase() === 'pending'
        ) {
          return 'activity due today'
        } else return 'future activity scheduled'
      }
    }
  }

  useEffect(() => {
    if (allStages.length === 0) getAllKanbanStages()
  }, [allStages, getAllKanbanStages])

  useEffect(() => {
    getAllKanbanLeadsDetails({
      variables: { ...leadsDefaultParams },
    })
  }, [leadsDefaultParams, getAllKanbanLeadsDetails])

  useEffect(() => {
    if (
      calledGetAllStages &&
      !isLoadingGetAllStages &&
      !getAllStagesError &&
      getAllStagesData
    )
      getAllStagesData?.stages?.length && setAllStages(getAllStagesData.stages)
  }, [
    calledGetAllStages,
    getAllStagesData,
    isLoadingGetAllStages,
    getAllStagesError,
  ])

  if (
    calledGetAllLeadsDetail &&
    !isLoadingGetAllLeadsDetail &&
    !getAllLeadsError &&
    getAllLeadsDetailData
  ) {
    const mapLeadsPipelineWise = groupByPipelineId(
      getAllLeadsDetailData?.findManyCmLead,
      'PipelineStage',
      'Pipeline',
      'id'
    )
    if (
      !isLeadMove &&
      JSON.stringify(mapLeadsPipelineWise) !== JSON.stringify(leadsState)
    )
      setLeadsState(mapLeadsPipelineWise)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollAtBottomAndLoadMoreLeads, false)

    return () =>
      window.removeEventListener(
        'scroll',
        scrollAtBottomAndLoadMoreLeads,
        false
      )
  }, [scrollAtBottomAndLoadMoreLeads])

  return (
    <div>
      <div ref={dragableWrapperRef} className={styles.dragableWrapper}>
        {isLoadingGetAllStages ? (
          <LeadsStagesSkeleton />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.cardMainWrapper}>
              {allStages?.map((stage, stageIndex) => {
                const {
                  name,
                  Pipeline: { id },
                } = stage
                return (
                  <Droppable key={Math.random()} droppableId={`${id}`}>
                    {(provided, snapshot) => (
                      <div className={styles.leadStageWrapper}>
                        <div className={styles.leadStage} ref={leadsStagesRef}>
                          <div
                            key={`stage ${id}`}
                            className={styles.leadStageTitlemain}
                          >
                            <div className={styles.leadStageTitle}>
                              <div className={styles.leadStageName}>{name}</div>
                              <div
                                className={styles.leadCount}
                              >{`$0 . 5 Leads`}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={styles.allCards}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {isLoadingGetAllLeadsDetail ? (
                            <LeadsSkeleton />
                          ) : (
                            leadsState?.[id]?.map((item, index) => {
                              let contactName,
                                contactImg = ''
                              const {
                                Name,
                                lastName,
                                ContactID,
                                status,
                                Contact,
                                Activity,
                                User: { image, username },
                              } = item

                              if (
                                typeof ContactID === 'number' &&
                                ContactID !== 0
                              ) {
                                contactName = `${Contact?.Fname} ${Contact?.Lname}`
                                contactImg = Contact?.Avatar
                              }

                              return (
                                <Draggable
                                  key={`draggable-key-${index}`}
                                  draggableId={`${stageIndex}-${index}`}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    >
                                      <div className={styles.cardWrapper}>
                                        <KanbanCard
                                          leadTitle={`${Name} ${lastName}`}
                                          onLeadTitleClickHandler={() =>
                                            console.log(
                                              'onLeadTitleClickHandler'
                                            )
                                          }
                                          labels={['#Label1', '#Label2']}
                                          leadOwnerName={username}
                                          leadOwnerImg={getImage(image)}
                                          contactName={contactName}
                                          contactImg={getImage(contactImg)}
                                          activityStatus={findStatusOfActivity(
                                            Activity
                                          )}
                                          leadStatus={status}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              )
                            })
                          )}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                )
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  )
}

export default LeadsStagesComponent
