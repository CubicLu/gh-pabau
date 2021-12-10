import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef,
} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Tooltip, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { KanbanCard } from '@pabau/ui'
import {
  useGetKanbanLeadsLazyQuery,
  useGetPipelineStagesLazyQuery,
  useUpdateOneCmLeadMutation,
} from '@pabau/graphql'
import styles from './LeadsStages.module.less'
import LeadsSkeleton from './LeadsSkeleton'
import LeadsStagesSkeleton from './LeadsStagesSkeleton'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

export interface leadsStagesComponentProps {
  pipelineId: number | null
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
const findIndexOfState = (state, searchableValue, searchVariable) => {
  return state.findIndex(
    (stage) => stage[searchableValue] === Number.parseInt(searchVariable)
  )
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

const LeadsStagesComponent: FC<leadsStagesComponentProps> = ({
  pipelineId,
}) => {
  const [allStages, setAllStages] = useState([])
  const [leadsDefaultParams, setLeadsDefaultParams] = useState({
    limit: 30,
    skip: 0,
  })
  const [leadsState, setLeadsState] = useState({})
  const [queryIsCalled, setQueryIsCalled] = useState(false)
  const leadsLenghtRef = useRef({ leadsLength: 0 })
  const leadsArrayRef = useRef({ leadsObj: {} })
  const leadsContainerRef = useRef(null)
  const wonLostDropZoneRef = useRef(null)
  const scrollRef = useRef({ position: 0 })
  const stageQueryRef = useRef({
    queryCalled: 0,
    queryCompleted: false,
    stageWithLeads: [],
    leadSkipIndex: {},
  })
  const stageNameRef = useRef([])
  const cardWrapperRef = useRef([])
  const stageNameContent = useRef({})
  const resetLeadsRef = useRef({ resetStages: [], resetLeads: {} })

  const { t } = useTranslationI18()

  const currentResetLead = resetLeadsRef.current

  const [
    getAllKanbanStages,
    {
      called: calledGetAllStages,
      loading: isLoadingGetAllStages,
      data: getAllStagesData,
      error: getAllStagesError,
    },
  ] = useGetPipelineStagesLazyQuery()

  const [
    getAllKanbanLeadsDetails,
    {
      called: calledGetAllLeadsDetail,
      loading: isLoadingGetAllLeadsDetail,
      data: getAllLeadsDetailData,
      error: getAllLeadsError,
    },
  ] = useGetKanbanLeadsLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: () => {
      const stageQuery = stageQueryRef.current
      stageQuery.queryCompleted = true
      stageQuery.queryCalled = stageQuery.queryCalled + 1
    },
  })

  const [updateLeadStage] = useUpdateOneCmLeadMutation({
    onError(e) {
      setLeadsState(currentResetLead.resetLeads)
      setAllStages(currentResetLead.resetStages)
    },
  })

  const callUpdateOneCmLeadMutation = (id, updateRecord) => {
    updateLeadStage({
      variables: {
        where: {
          ID: id,
        },
        data: updateRecord,
      },
    })
  }

  const onBeforeDragStart = () => {
    const currentWonLostDropZone = wonLostDropZoneRef.current
    currentWonLostDropZone.style.opacity = `1`
    currentWonLostDropZone.style.maxHeight = `100%`
  }
  const onDragEnd = (result) => {
    const currentWonLostDropZone = wonLostDropZoneRef.current
    currentWonLostDropZone.style.opacity = `0`
    currentWonLostDropZone.style.maxHeight = `1px`
    const nq = document.querySelector(`div[id="${result.draggableId}"]`)
    nq?.firstChild.remove()

    const originalWrapper =
      cardWrapperRef.current[`${result.draggableId}${result.draggableId}`]
        .current
    originalWrapper.style.position = 'static'

    const { source, destination } = result
    let newState = {},
      newStages = [],
      cloneStageLeads = [],
      sourceDataObj = {},
      destinationDataObj = {}
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    newState = { ...leadsState }

    if ([`Converted`, `Junk`].includes(destination.droppableId)) {
      callUpdateOneCmLeadMutation(leadsState[sInd][source.index][`lead_id`], {
        EnumStatus: {
          set: destination.droppableId,
        },
      })
      currentResetLead.resetLeads = leadsState
      cloneStageLeads = [...cloneStageLeads, ...newState[sInd]]
      let leadObj = newState[sInd][source.index]
      leadObj = { ...leadObj, status: destination.droppableId }
      cloneStageLeads[source.index] = leadObj
      newState[sInd] = cloneStageLeads
      setLeadsState(newState)
      return
    }

    if (sInd === dInd) return
    else {
      const result = move(
        leadsState[sInd],
        leadsState[dInd],
        source,
        destination
      )
      newStages = [...allStages]

      currentResetLead.resetStages = allStages

      const sourceIndex = findIndexOfState(newStages, `id`, source.droppableId)
      const destinationIndex = findIndexOfState(
        newStages,
        `id`,
        destination.droppableId
      )
      sourceDataObj = { ...newStages[sourceIndex] }
      let sourceDataObjCount = sourceDataObj['_count']
      sourceDataObjCount = {
        ...sourceDataObjCount,
        CmLead: sourceDataObjCount?.CmLead - 1,
      }

      sourceDataObj['_count'] = sourceDataObjCount
      newStages[sourceIndex] = sourceDataObj

      destinationDataObj = { ...newStages[destinationIndex] }
      let destinationDataObjCount = destinationDataObj['_count']
      destinationDataObjCount = {
        ...destinationDataObjCount,
        CmLead: destinationDataObjCount?.CmLead + 1,
      }

      destinationDataObj['_count'] = destinationDataObjCount
      newStages[destinationIndex] = destinationDataObj

      currentResetLead.resetLeads = leadsState
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      setLeadsState(newState)

      setAllStages(newStages)

      callUpdateOneCmLeadMutation(leadsState[sInd][source.index][`lead_id`], {
        PipelineStage: {
          connect: {
            id: dInd,
          },
        },
      })
    }
  }

  const scrollAtBottomAndLoadMoreLeads = useCallback(
    (event) => {
      const bottom =
        event.target.scrollHeight - event.target.scrollTop <=
          event.target.clientHeight ||
        Math.floor(event.target.scrollHeight - event.target.scrollTop) ===
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
    if (activitys?.length === 0) return 'no activity scheduled'
    else if (activitys) {
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

  const stageNameContentHandler = (stageIndex, stageName, shouldTooltip) => {
    if (!stageNameContent.current[stageIndex]) {
      stageNameContent.current[stageIndex] = shouldTooltip ? (
        <Tooltip
          title={stageName}
          placement={'top'}
          overlayClassName={styles.overlay}
        >
          {
            <div
              className={styles.leadStageName}
              style={{ overflow: 'hidden' }}
            >
              {stageName}
            </div>
          }
        </Tooltip>
      ) : (
        <div className={styles.leadStageName}>{stageName}</div>
      )
    }
  }

  useEffect(() => {
    if (allStages.length === 0 && pipelineId) {
      getAllKanbanStages({
        variables: {
          pipeline_id: pipelineId,
        },
      })
    }
  }, [allStages, getAllKanbanStages, leadsDefaultParams, pipelineId])

  useEffect(() => {
    if (allStages.length > 0 && !queryIsCalled) {
      let stageWithMoreLeads = []
      const leadsArray = leadsArrayRef.current

      if (Object.keys(leadsArray.leadsObj).length > 0) {
        stageWithMoreLeads = Object.keys(leadsArray.leadsObj).filter(
          (i) =>
            leadsArray.leadsObj[i].length >= leadsLenghtRef.current.leadsLength
        )
      } else {
        for (const stage of allStages) {
          stageWithMoreLeads.push(stage['id'])
        }
      }
      stageQueryRef.current.stageWithLeads = stageWithMoreLeads
    }
  }, [allStages, queryIsCalled, stageQueryRef, leadsArrayRef])

  useEffect(() => {
    const stageQuery = stageQueryRef.current
    if (
      stageQuery.stageWithLeads.length > 0 &&
      stageQuery.queryCalled < stageQuery.stageWithLeads.length &&
      leadsDefaultParams.skip + leadsDefaultParams.limit !==
        leadsLenghtRef.current.leadsLength
    ) {
      const stageIndex = Number.parseInt(
        stageQuery.stageWithLeads[stageQuery.queryCalled]
      )
      if (stageQuery.queryCalled === 0) setQueryIsCalled(true)
      if (pipelineId) {
        let defaultParams = {}
        if (stageIndex in stageQuery.leadSkipIndex) {
          defaultParams = { skip: stageQuery.leadSkipIndex[stageIndex] }
        }
        getAllKanbanLeadsDetails({
          variables: {
            ...leadsDefaultParams,
            ...defaultParams,
            pipeline_id: pipelineId,
            pipeline_stage_id: stageIndex,
          },
        })
      }
    }
  }, [
    leadsDefaultParams,
    getAllKanbanLeadsDetails,
    allStages,
    stageQueryRef,
    leadsState,
    queryIsCalled,
    pipelineId,
  ])

  useEffect(() => {
    if (
      calledGetAllStages &&
      !isLoadingGetAllStages &&
      !getAllStagesError &&
      getAllStagesData &&
      getAllStagesData?.stages?.length
    ) {
      setAllStages(getAllStagesData.stages)
    }
  }, [
    calledGetAllStages,
    getAllStagesData,
    isLoadingGetAllStages,
    getAllStagesError,
  ])

  useEffect(() => {
    const stageQuery = stageQueryRef.current
    const leadsArray = leadsArrayRef.current
    if (
      allStages.length > 0 &&
      queryIsCalled &&
      calledGetAllLeadsDetail &&
      !isLoadingGetAllLeadsDetail &&
      !getAllLeadsError &&
      getAllLeadsDetailData &&
      stageQuery.queryCalled <= allStages.length &&
      stageQuery.queryCompleted
    ) {
      const { limit, skip } = leadsDefaultParams
      const indexOfStages =
        stageQuery.stageWithLeads[stageQuery.queryCalled - 1]

      const localLeadState = {
        ...leadsState,
        [indexOfStages]: leadsState[indexOfStages]
          ? [
              ...leadsState[indexOfStages],
              ...getAllLeadsDetailData.findManyCmLead,
            ]
          : getAllLeadsDetailData.findManyCmLead,
      }
      leadsArray.leadsObj[indexOfStages] = leadsArray.leadsObj[indexOfStages]
        ? (leadsArray.leadsObj[indexOfStages] = [
            ...leadsArray.leadsObj[indexOfStages],
            ...getAllLeadsDetailData.findManyCmLead,
          ])
        : getAllLeadsDetailData.findManyCmLead
      setLeadsState(localLeadState)
      stageQuery.queryCompleted = false
      if (stageQuery.queryCalled === stageQuery.stageWithLeads.length) {
        setQueryIsCalled(false)
        leadsLenghtRef.current.leadsLength = limit + skip
        stageQuery.queryCalled = 0
        leadsContainerRef.current.scrollTop = scrollRef.current.position
      }
    }
  }, [
    allStages,
    queryIsCalled,
    isLoadingGetAllLeadsDetail,
    getAllLeadsError,
    getAllLeadsDetailData,
    leadsDefaultParams,
    leadsState,
    stageQueryRef,
    calledGetAllLeadsDetail,
  ])

  return (
    <div>
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
      >
        <div
          ref={leadsContainerRef}
          className={styles.dragableWrapper}
          onScroll={scrollAtBottomAndLoadMoreLeads}
        >
          {isLoadingGetAllStages ? (
            <LeadsStagesSkeleton />
          ) : (
            <div className={styles.cardMainWrapper}>
              {allStages?.map((stage, stageIndex) => {
                const { name, id, _count } = stage
                const leadParStage = _count?.CmLead ? _count.CmLead : 0
                if (!stageNameRef.current[stageIndex]) {
                  stageNameRef.current[stageIndex] = createRef()
                } else if (
                  stageNameRef.current[stageIndex] &&
                  Object.keys(leadsState).length === allStages.length
                ) {
                  const {
                    offsetHeight,
                    offsetWidth,
                    scrollHeight,
                    scrollWidth,
                  } = stageNameRef.current[stageIndex].current

                  if (
                    offsetHeight < scrollHeight ||
                    offsetWidth < scrollWidth
                  ) {
                    stageNameContentHandler(stageIndex, name, true)
                  }
                }

                return (
                  <Droppable key={Math.random()} droppableId={`${id}`}>
                    {(provided, snapshot) => (
                      <div className={styles.leadStageWrapper}>
                        <div className={styles.leadStage}>
                          <div
                            key={id}
                            className={styles.leadStageTitlemain}
                            ref={stageNameRef.current[stageIndex]}
                          >
                            <div className={styles.leadStageTitle}>
                              {stageNameContent?.current[stageIndex] ? (
                                stageNameContent?.current[stageIndex]
                              ) : (
                                <div className={styles.leadStageName}>
                                  {name}
                                </div>
                              )}
                              <div
                                className={styles.leadCount}
                              >{`Â£0 . ${leadParStage} ${t(
                                `kanban-board.leads.leads-per-stage`
                              )}`}</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={styles.allCards}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            background: snapshot.isDraggingOver
                              ? '#cbcccd'
                              : null,
                          }}
                        >
                          {Object.keys(leadsState).length === 0 &&
                          isLoadingGetAllLeadsDetail ? (
                            <LeadsSkeleton />
                          ) : (
                            leadsState?.[id]?.map((item, index) => {
                              let contactName,
                                contactImg,
                                userName,
                                userImage = '',
                                setEnumStatus = ''
                              const {
                                lead_id,
                                Name,
                                lastName,
                                ContactID,
                                Contact,
                                Activity,
                                User,
                                status,
                              } = item

                              if (User) {
                                userImage = User.image
                                  ? getImage(User.image)
                                  : ''
                                userName = User.full_name
                              }

                              if (
                                typeof ContactID === 'number' &&
                                ContactID !== 0
                              ) {
                                contactName = `${Contact?.Fname} ${Contact?.Lname}`
                                contactImg = Contact?.Avatar
                                  ? getImage(Contact.Avatar)
                                  : 'no-image'
                              }

                              if (
                                !cardWrapperRef.current[
                                  `${stageIndex}-${lead_id}${stageIndex}-${lead_id}`
                                ]
                              ) {
                                cardWrapperRef.current[
                                  `${stageIndex}-${lead_id}${stageIndex}-${lead_id}`
                                ] = createRef()
                              }

                              if (status === `Converted`) setEnumStatus = `Won`
                              else if (status === `Junk`) setEnumStatus = `Lost`
                              else setEnumStatus = status

                              return (
                                <Draggable
                                  key={lead_id}
                                  draggableId={`${stageIndex}-${lead_id}`}
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
                                      <div
                                        className={styles.cardWrapper}
                                        draggable="true"
                                        ref={
                                          cardWrapperRef.current[
                                            `${stageIndex}-${lead_id}${stageIndex}-${lead_id}`
                                          ]
                                        }
                                      >
                                        <KanbanCard
                                          isLoading={false}
                                          leadTitle={`${Name} ${lastName}`}
                                          onLeadTitleClickHandler={() =>
                                            console.log(
                                              'onLeadTitleClickHandler'
                                            )
                                          }
                                          labels={['#Label1', '#Label']}
                                          leadOwnerName={userName}
                                          leadOwnerImg={userImage}
                                          contactName={contactName}
                                          contactImg={contactImg}
                                          activityStatus={findStatusOfActivity(
                                            Activity
                                          )}
                                          leadStatus={setEnumStatus}
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
          )}
          {queryIsCalled && allStages.length > 0 && (
            <div className={styles.preLoader}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
        </div>
        <div className={styles.wonLostDropZone} ref={wonLostDropZoneRef}>
          <Droppable key={Math.random()} droppableId={`Converted`}>
            {(provided, snapshot) => (
              <div
                className={styles.wonDropZone}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? '#65CD98' : null,
                  color: snapshot.isDraggingOver ? 'white' : null,
                }}
              >
                {t(`kanban-board.leads.leads-won-stage`)}
              </div>
            )}
          </Droppable>
          <Droppable key={Math.random()} droppableId={`Junk`}>
            {(provided, snapshot) => (
              <div
                className={styles.loseDropZone}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? '#FF5B64' : null,
                  color: snapshot.isDraggingOver ? 'white' : null,
                }}
              >
                {t(`kanban-board.leads.leads-lost-stage`)}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

export default LeadsStagesComponent
