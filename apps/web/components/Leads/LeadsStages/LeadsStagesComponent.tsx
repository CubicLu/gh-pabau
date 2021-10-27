import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import noUser from '../../../assets/images/no-user-icon.svg'
import austin from '../../../assets/images/users/austin.png'

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

const groupByPipelineId = (arr, property) => {
  return arr.reduce(function (memo, x) {
    if (x[property] && x[property] !== `null` && x[property] !== `undefined`) {
      if (!memo[x[property]]) {
        memo[x[property]] = []
      }
      memo[x[property]].push(x)
    }
    return memo
  }, {})
}

const LeadsStagesComponent = () => {
  const [allStages, setAllStages] = useState([])
  const [leadsDefaultParams, setLeadsDefaultParams] = useState({
    limit: 100,
    skip: 0,
  })
  const [leadsState, setLeadsState] = useState({})
  const [queryIsCalled, setQueryIsCalled] = useState(false)
  const leadsLenghtRef = useRef({ leadsLength: 0 })
  const leadsArrayRef = useRef({ leadsArray: [] })
  const leadsContainerRef = useRef(null)
  const scrollRef = useRef({ position: 0 })

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
    }
  }

  const scrollAtBottomAndLoadMoreLeads = useCallback(
    (event) => {
      const bottom =
        event.target.scrollHeight - event.target.scrollTop <=
        event.target.clientHeight
      if (bottom) {
        const { limit, skip } = leadsDefaultParams
        if (
          !queryIsCalled &&
          limit + skip === leadsLenghtRef.current.leadsLength
        ) {
          scrollRef.current.position = event.target.scrollHeight
          setLeadsDefaultParams({
            ...leadsDefaultParams,
            skip: leadsDefaultParams.limit + leadsDefaultParams.skip,
          })
        }
      }
    },
    [leadsDefaultParams, queryIsCalled]
  )

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
    if (
      leadsDefaultParams.skip + leadsDefaultParams.limit !==
      leadsLenghtRef.current.leadsLength
    ) {
      setQueryIsCalled(true)
      getAllKanbanLeadsDetails({
        variables: { ...leadsDefaultParams },
      })
    }
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

  useEffect(() => {
    if (
      allStages?.length > 0 &&
      queryIsCalled &&
      calledGetAllLeadsDetail &&
      !isLoadingGetAllLeadsDetail &&
      !getAllLeadsError &&
      getAllLeadsDetailData
    ) {
      const { limit, skip } = leadsDefaultParams
      if (
        limit + skip !== leadsLenghtRef.current.leadsLength &&
        getAllLeadsDetailData?.findManyCmLead?.length > 0
      ) {
        leadsContainerRef.current.scrollTop = scrollRef.current.position

        const mapLeadsPipelineWise = groupByPipelineId(
          getAllLeadsDetailData?.findManyCmLead,
          'LeadStatus'
        )

        if (
          JSON.stringify(leadsArrayRef.current.leadsArray) !==
          JSON.stringify(mapLeadsPipelineWise)
        ) {
          leadsArrayRef.current.leadsArray = mapLeadsPipelineWise
          const localLeadState = { ...leadsState }
          for (const stageObject of allStages) {
            const { id } = stageObject
            const existingLeads = localLeadState[id] ? localLeadState[id] : []
            const newLeads = mapLeadsPipelineWise[id]
              ? mapLeadsPipelineWise[id]
              : []
            if (JSON.stringify(existingLeads) !== JSON.stringify(newLeads)) {
              localLeadState[id] = [...existingLeads, ...newLeads]
            }
          }
          setLeadsState(localLeadState)
          setQueryIsCalled(false)
          leadsLenghtRef.current.leadsLength = limit + skip
          leadsContainerRef.current.scrollTop = scrollRef.current.position
        }
      } else if (getAllLeadsDetailData?.findManyCmLead?.length === 0) {
        leadsContainerRef.current.scrollTop = scrollRef.current.position
      }
    }
  }, [
    calledGetAllLeadsDetail,
    isLoadingGetAllLeadsDetail,
    getAllLeadsError,
    getAllLeadsDetailData,
    leadsState,
    allStages,
    leadsDefaultParams,
    leadsLenghtRef,
    leadsArrayRef,
    queryIsCalled,
  ])

  return (
    <div>
      <div
        ref={leadsContainerRef}
        className={styles.dragableWrapper}
        onScroll={scrollAtBottomAndLoadMoreLeads}
      >
        {isLoadingGetAllStages ? (
          <LeadsStagesSkeleton />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.cardMainWrapper}>
              {allStages?.map((stage, stageIndex) => {
                const { name, id } = stage
                return (
                  <Droppable key={Math.random()} droppableId={`${id}`}>
                    {(provided, snapshot) => (
                      <div className={styles.leadStageWrapper}>
                        <div className={styles.leadStage}>
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
                          {Object.keys(leadsState).length === 0 &&
                          isLoadingGetAllLeadsDetail ? (
                            <LeadsSkeleton />
                          ) : (
                            leadsState?.[id]?.map((item, index) => {
                              let contactName,
                                contactImg,
                                userImage = ''
                              const {
                                Name,
                                lastName,
                                ContactID,
                                status,
                                Contact,
                                Activity,
                                User: { image, username },
                              } = item

                              userImage = image ? getImage(image) : austin
                              if (
                                typeof ContactID === 'number' &&
                                ContactID !== 0
                              ) {
                                contactName = `${Contact?.Fname} ${Contact?.Lname}`
                                contactImg = Contact?.Avatar
                                  ? getImage(Contact.Avatar)
                                  : noUser
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
                                          isLoading={false}
                                          leadTitle={`${Name} ${lastName}`}
                                          onLeadTitleClickHandler={() =>
                                            console.log(
                                              'onLeadTitleClickHandler'
                                            )
                                          }
                                          labels={['#Label1', '#Label']}
                                          leadOwnerName={username}
                                          leadOwnerImg={userImage}
                                          contactName={contactName}
                                          contactImg={contactImg}
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
