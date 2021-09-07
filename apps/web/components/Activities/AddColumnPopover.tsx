import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { Input, Popover, Checkbox, Radio, Drawer, Collapse } from 'antd'
import { MutationFunction } from '@apollo/client'
import Highlighter from 'react-highlight-words'
import { Button } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { CustomScrollbar } from '../CustomScrollbar/Index'
import styles from '../../pages/activities/index.module.less'
import { defaultColumns } from './ActivitiesTable'
import { useMedia } from 'react-use'
import { useUser } from '../../context/UserContext'
import {
  CaretRightOutlined
} from '@ant-design/icons'

interface AddColumnsProps {
  upsertActiveColumnMutation: MutationFunction
  children?: ReactNode
  selectedColumn?: string[]
  setSelectedColumn?: (val: string[]) => void
  visibleAddColumnPopover?: boolean
  setVisibleAddColumnPopover?: (val) => void
}
export const columnNames = {
  done: { label: 'Done', id: '' },
  dueDate: { label: 'Due date', id: 'dueDate' },
  subject: { label: 'Subject', id: 'subject' },
  assignedToUser: { label: 'Assigned to user', id: 'assigned.firstName' },
  status: { label: 'Status', id: 'status' },
  type: { label: 'Type', id: 'type' },
  duration: { label: 'Duration', id: 'duration' },
  doneTime: { label: 'Done time', id: 'doneTime' },
  note: { label: 'Note', id: 'note' },
  freeBusy: { label: 'Free/busy', id: 'freeBusy' },
  creator: { label: 'Creator', id: 'creator' },
  addTime: { label: 'Add time', id: 'addTime' },
  leadDescription: { label: 'Lead description', id: 'lead.description' },
  leadName: { label: 'Lead name', id: 'lead.firstName' },
  leadEmail: { label: 'Lead email', id: 'lead.email' },
  leadPhone: { label: 'Lead phone', id: 'lead.phone' },
  leadCreatedDate: { label: 'Lead created date', id: 'lead.createdDate' },
  wonTime: { label: 'Won time', id: 'lead.wonTime' },
  leadOwner: { label: 'Lead owner', id: 'lead.owner.firstName' },
  leadDoneActivities: {
    label: 'Lead done activities',
    id: 'lead.leadDoneActivities',
  },
  leadClosedOn: { label: 'Lead closed on', id: 'lead.leadClosedOn' },
  firstActivityTime: {
    label: 'First activity time',
    id: 'lead.firstActivityTime',
  },
  leadLastActivityDate: {
    label: 'Lead last activity date',
    id: 'lead.leadLastActivityDate',
  },
  leadLastActivity: {
    label: 'Lead last activity',
    id: 'lead.leadLastActivity',
  },
  leadLostReason: { label: 'Lead lost reason', id: 'lead.leadLostReason' },
  leadTotalActivities: {
    label: 'Lead total activities',
    id: 'lead.leadTotalActivities',
  },
  leadLostTime: { label: 'Lead lost time', id: 'lead.leadLostTime' },
  leadSource: { label: 'Lead source', id: 'lead.leadSource' },
  wonBy: { label: 'Won by', id: 'lead.wonBy' },
  leadStage: { label: 'Lead stage', id: 'lead.leadStage' },
  clientName: { label: 'Client name', id: 'client.firstName' },
  label: { label: 'Label', id: 'client.label' },
  clientEmail: { label: 'Client email', id: 'client.email' },
  clientPhone: { label: 'Client phone', id: 'client.phone' },
  clientStreet: { label: 'Client street', id: 'client.street' },
  clientCity: { label: 'Client city', id: 'client.city' },
  clientPostCode: { label: 'Client postcode', id: 'client.postcode' },
  clientCountry: { label: 'Client country', id: 'client.country' },
  clientTotalActivities: {
    label: 'Client total activities',
    id: 'client.totalActivities',
  },
  clientMobile: {
    label: 'Client mobile',
    id: 'client.clientMobile',
  },
  clientCreatedAt: {
    label: 'Client created date',
    id: 'client.clientCreatedAt',
  },
  clientSource: {
    label: 'Client source',
    id: 'client.clientSource',
  },
  clientSalutation: {
    label: 'Client salutation',
    id: 'client.clientSalutation',
  },
  clientGender: {
    label: 'Client gender',
    id: 'client.clientGender',
  },
  clientID: {
    label: 'Client ID',
    id: 'client.clientID',
  },
  clientDOB: {
    label: 'Client DOB',
    id: 'client.clientDOB',
  },
  clientStatus: {
    label: 'Client status',
    id: 'client.clientStatus',
  },
}

export const AddColumnPopover: FC<AddColumnsProps> = React.memo(
  ({
    children,
    selectedColumn,
    setSelectedColumn,
    visibleAddColumnPopover,
    setVisibleAddColumnPopover,
    upsertActiveColumnMutation,
  }) => {
    const { t } = useTranslationI18()
    const isMobile = useMedia('(max-width: 768px)', false)
    const [searchColumn, setSearchColumn] = useState('')
    const [selectedTab, setSelectedTab] = useState('activity')
    const [selectedColumnOption, setSelectedColumnOption] = useState([])
    const [allOptions, setAllOptions] = useState([])
    const [filterOptions, setFilterOptions] = useState([])
    const [filterVisibleOptions, setFilterVisibleOptions] = useState([])
    const [visibleOptions, setVisibleOptions] = useState([])
    const [visibleOptionsSelect, setVisibleOptionsSelect] = useState([])
    const [defaultColumnList, setDefaultColumnList] = useState([])
    const loggedUser = useUser()

    const activityOptions = useMemo(
      () => [
        { label: t('activityList.column.done'), value: columnNames.done.label },
        {
          label: t('activityList.column.dueDate'),
          value: columnNames.dueDate.label,
        },
        {
          label: t('activityList.column.subject'),
          value: columnNames.subject.label,
        },
        {
          label: t('activityList.column.assignedToUser'),
          value: columnNames.assignedToUser.label,
        },
        {
          label: t('activityList.column.status'),
          value: columnNames.status.label,
        },
        // { label: t('activityList.column.lead'), value: columnNames.lead.label },
        { label: t('activityList.column.type'), value: columnNames.type.label },
        {
          label: t('activityList.column.duration'),
          value: columnNames.duration.label,
        },
        {
          label: t('activityList.column.doneTime'),
          value: columnNames.doneTime.label,
        },
        { label: t('activityList.column.note'), value: columnNames.note.label },
        {
          label: t('activityList.column.freeBusy'),
          value: columnNames.freeBusy.label,
        },
        {
          label: t('activityList.column.creator'),
          value: columnNames.creator.label,
        },
        {
          label: t('activityList.column.addTime'),
          value: columnNames.addTime.label,
        },
      ],
      [t]
    )

    const leadOptions = useMemo(
      () => [
        {
          label: t('activityList.column.leadName'),
          value: columnNames.leadName.label,
        },
        {
          label: t('activityList.column.leadEmail'),
          value: columnNames.leadEmail.label,
        },
        {
          label: t('activityList.column.leadPhone'),
          value: columnNames.leadPhone.label,
        },
        {
          label: t('activityList.column.leadCreatedDate'),
          value: columnNames.leadCreatedDate.label,
        },
        {
          label: t('activityList.column.leadWonTime'),
          value: columnNames.wonTime.label,
        },
        {
          label: t('activityList.column.leadOwner'),
          value: columnNames.leadOwner.label,
        },
        {
          label: t('activityList.column.leadDoneActivities'),
          value: columnNames.leadDoneActivities.label,
        },
        {
          label: t('activityList.column.leadClosedOn'),
          value: columnNames.leadClosedOn.label,
        },
        {
          label: t('activityList.column.firstActivityTime'),
          value: columnNames.firstActivityTime.label,
        },
        {
          label: t('activityList.column.leadLastActivityDate'),
          value: columnNames.leadLastActivityDate.label,
        },
        {
          label: t('activityList.column.leadLastActivity'),
          value: columnNames.leadLastActivity.label,
        },
        {
          label: t('activityList.column.leadLostReason'),
          value: columnNames.leadLostReason.label,
        },
        {
          label: t('activityList.column.leadTotalActivities'),
          value: columnNames.leadTotalActivities.label,
        },
        {
          label: t('activityList.column.leadLostTime'),
          value: columnNames.leadLostTime.label,
        },
        {
          label: t('activityList.column.leadSource'),
          value: columnNames.leadSource.label,
        },
        {
          label: t('activityList.column.wonBy'),
          value: columnNames.wonBy.label,
        },
        {
          label: t('activityList.column.leadStage'),
          value: columnNames.leadStage.label,
        },
        {
          label: t('activityList.column.leadDescription'),
          value: columnNames.leadDescription.label,
        },
      ],
      [t]
    )

    const clientOptions = useMemo(
      () => [
        {
          label: t('activityList.column.clientName'),
          value: columnNames.clientName.label,
        },
        {
          label: t('activityList.column.label'),
          value: columnNames.label.label,
        },
        {
          label: t('activityList.column.clientEmail'),
          value: columnNames.clientEmail.label,
        },
        {
          label: t('activityList.column.clientPhone'),
          value: columnNames.clientPhone.label,
        },
        // {
        //   label: t('activityList.column.address.details'),
        //   value: 'addressDetails',
        //   hasCollapse: true,
        //   collapseValue: [
        //     {
        //       label: t('activityList.column.clientStreet'),
        //       value: columnNames.clientStreet.label,
        //     },
        //     {
        //       label: t('activityList.column.clientCity'),
        //       value: columnNames.clientCity.label,
        //     },
        //     {
        //       label: t('activityList.column.clientPostcode'),
        //       value: columnNames.clientPostCode.label,
        //     },
        //     {
        //       label: t('activityList.column.clientCountry'),
        //       value: columnNames.clientCountry.label,
        //     },
        //   ]
        // },
        {
          label: t('activityList.column.clientStreet'),
          value: columnNames.clientStreet.label,
        },
        {
          label: t('activityList.column.clientCity'),
          value: columnNames.clientCity.label,
        },
        {
          label: t('activityList.column.clientPostcode'),
          value: columnNames.clientPostCode.label,
        },
        {
          label: t('activityList.column.clientCountry'),
          value: columnNames.clientCountry.label,
        },
        {
          label: t('activityList.column.clientTotalActivities'),
          value: columnNames.clientTotalActivities.label,
        },
        {
          label: t('activityList.column.clientMobile'),
          value: columnNames.clientMobile.label,
        },
        {
          label: t('activityList.column.clientCreatedAt'),
          value: columnNames.clientCreatedAt.label,
        },
        {
          label: t('activityList.column.clientSource'),
          value: columnNames.clientSource.label,
        },
        {
          label: t('activityList.column.clientSalutation'),
          value: columnNames.clientSalutation.label,
        },
        {
          label: t('activityList.column.clientGender'),
          value: columnNames.clientGender.label,
        },
        {
          label: t('activityList.column.clientID'),
          value: columnNames.clientID.label,
        },
        {
          label: t('activityList.column.clientDOB'),
          value: columnNames.clientDOB.label,
        },
        {
          label: t('activityList.column.clientStatus'),
          value: columnNames.clientStatus.label,
        },
      ],
      [t]
    )

    useEffect(() => {
      setAllOptions([
        ...activityOptions.map((data) => ({ ...data, type: 'activity' })),
        ...leadOptions.map((data) => ({ ...data, type: 'lead' })),
        ...clientOptions.map((data) => ({ ...data, type: 'client' })),
      ])
    }, [activityOptions, leadOptions, clientOptions])

    useEffect(() => {
      setSelectedColumnOption([])
      if (allOptions.length > 0) {
        const visible = selectedColumn.map((data) => {
          return allOptions?.find((item) => item.value === data)
        })
        setVisibleOptions(visible)
        setDefaultColumnList(visible)
        setVisibleOptionsSelect(visible)
      }
    }, [selectedColumn, allOptions])

    useEffect(() => {
      let filterData = [...allOptions]
      let filterVisible = [...visibleOptions]
      if (searchColumn) {
        const searchData = searchColumn.toLowerCase()
        filterData = filterData.filter((data) => {
          return (
            data.label.toLowerCase().includes(searchData) ||
            data.value.toLowerCase().includes(searchData)
          )
        })
        filterVisible = filterVisible.filter((data) => {
          return (
            data.label.toLowerCase().includes(searchData) ||
            data.value.toLowerCase().includes(searchData)
          )
        })
      }
      setFilterOptions(filterData)
      setFilterVisibleOptions(filterVisible)
    }, [searchColumn, allOptions, visibleOptions])

    const onTabChange = (e) => {
      setSelectedTab(e.target.value)
    }

    const handleSave = async () => {
      const activeColumns = [
        ...visibleOptionsSelect.map((data) => data.value),
        ...selectedColumnOption.map((data) => data.value),
      ]

      setSelectedColumn([
        ...visibleOptionsSelect.map((data) => data.value),
        ...selectedColumnOption.map((data) => data.value),
      ])
      handleVisible()
      await upsertActiveColumnMutation({
        variables: {
          columns: JSON.stringify({ columns: activeColumns }),
          userId: loggedUser?.me?.user,
          companyId: loggedUser?.me?.company,
        },
      })
    }

    const handleDefault = () => {
      const defaultColumn = defaultColumns.map((data) => {
        return allOptions?.find((item) => item.value === data)
      })
      setVisibleOptionsSelect(defaultColumn)
      setSelectedColumnOption([])
    }

    const handleCancel = () => {
      setVisibleOptionsSelect(defaultColumnList)
      setSelectedColumnOption([])
      handleVisible()
    }

    const handleVisible = () => {
      setVisibleAddColumnPopover((e) => !e)
      visibleAddColumnPopover && setSearchColumn('')
    }

    const handleVisibleCheckboxChange = (e) => {
      const {
        target: { checked, value },
      } = e
      if (
        checked &&
        !visibleOptionsSelect.some((data) => data.value === value.value)
      ) {
        setVisibleOptionsSelect((val) => [...val, value])
      } else {
        const list = [...visibleOptionsSelect]
        const index = list.findIndex((data) => data.value === value.value)
        list.splice(index, 1)
        setVisibleOptionsSelect(list)
      }
    }

    const handleCheckboxChange = (e) => {
      const {
        target: { checked, value },
      } = e
      console.log("e---------------", e)
      if (
        checked &&
        !selectedColumnOption.some((data) => data.value === value.value)
      ) {
        setSelectedColumnOption((val) => [...val, value])
      } else {
        const list = [...selectedColumnOption]
        const index = list.findIndex((data) => data.value === value.value)
        list.splice(index, 1)
        setSelectedColumnOption(list)
      }
    }

    const prepareClientOptions = (options) => {
      const clientOption = options
      .filter((data) => data.type === selectedTab)
      .filter(
        (data) =>
          !defaultColumnList.some(
            (item) => item.value === data.value
          )
      )
      console.log('clientOption', clientOption)
      const groupColumn = ['Client street', 'Client city', 'Client postcode', 'Client country']
      let collapseColumn = []
      let clientColumn = []
      for (let item of clientOption) {
        if (groupColumn.includes(item.value)) {
          collapseColumn.push({...item})
        } else {
          clientColumn.push({...item})
        }
      }
      let collapseIndex = clientOption.findIndex((item) => item.value === collapseColumn?.[0]?.value) ?? 0
      clientColumn.splice(collapseIndex, 0, {
        hasCollapse: true,
        collapseTitle: t('activityList.column.address.details'),
        collapseOptions: collapseColumn
      })
      console.log('collapseColumn-----', collapseColumn)
      console.log('clientColumn-----', clientColumn)
      console.log('collapseIndex-----', collapseIndex)
      console.log('selectedColumnOption------------', selectedColumnOption)
      return clientColumn.map((data, i) => (
        data.hasCollapse ? <Collapse
        ghost
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Collapse.Panel header={data.collapseTitle} key="1">
        {data?.collapseOptions?.map((optionItem, i) => (<Checkbox
        key={`${selectedTab}_${i}`}
        checked={selectedColumnOption.some(
          (item) => item.value === optionItem.value
        )}
        value={optionItem}
        onChange={handleCheckboxChange}
      >
        <Highlighter
          highlightClassName={styles.highlight}
          searchWords={[searchColumn]}
          textToHighlight={optionItem.label}
        >
          {optionItem.label}
        </Highlighter>
      </Checkbox>
      ))}
      </Collapse.Panel>
      </Collapse> : (<Checkbox
        key={`${selectedTab}_${i}`}
        checked={selectedColumnOption.some(
          (item) => item.value === data.value
        )}
        value={data}
        onChange={handleCheckboxChange}
      >
        <Highlighter
          highlightClassName={styles.highlight}
          searchWords={[searchColumn]}
          textToHighlight={data.label}
        >
          {data.label}
        </Highlighter>
      </Checkbox>)
      ))
    }
    console.log('filterOptions-----------', filterOptions)
    console.log('tab-----------', selectedTab)
    console.log('selectedColumn-----------', selectedColumnOption)

    const content = () => {
      return (
        <div className={styles.chooseColumnWrapper}>
          <div className={styles.inputWrap}>
            <Input
              value={searchColumn}
              placeholder={t('activityList.addColumn.searchColumn')}
              allowClear
              onChange={(e) => setSearchColumn(e.target.value)}
            />
          </div>
          <CustomScrollbar autoHide={true} className={styles.customScrollBar}>
            <div className={styles.contentDataWrap}>
              <div className={styles.contentEle}>
                <h5>{t('activityList.addColumn.visibleColumn')}</h5>
                <div className={styles.subColumns}>
                  {filterVisibleOptions?.map((option, i) => (
                    <div key={i} className={styles.checkboxWrapper}>
                      <Checkbox
                        checked={visibleOptionsSelect.some(
                          (item) => item.value === option.value
                        )}
                        disabled={option.label === 'Done'}
                        onChange={handleVisibleCheckboxChange}
                        name={option.label}
                        value={option}
                      >
                        <Highlighter
                          highlightClassName={styles.highlight}
                          searchWords={[searchColumn]}
                          textToHighlight={option.label}
                        >
                          {option.label}
                        </Highlighter>
                      </Checkbox>
                      <h6>{option.type}</h6>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.contentEle}>
                <h5>{t('activityList.addColumn.notVisibleColumn')}</h5>
                <div className={styles.subColumns}>
                  <Radio.Group onChange={onTabChange} value={selectedTab}>
                    <Radio.Button value="activity">
                      {t('activityList.addColumn.activity')}
                    </Radio.Button>
                    <Radio.Button value="lead">
                      {t('activityList.addColumn.lead')}
                    </Radio.Button>
                    <Radio.Button value="client">
                      {t('activityList.addColumn.client')}
                    </Radio.Button>
                  </Radio.Group>
                  <div className={styles.checkboxRadioWrapper}>
                    {selectedTab === 'client' ? prepareClientOptions(filterOptions): filterOptions
                      .filter((data) => data.type === selectedTab)
                      .filter(
                        (data) =>
                          !defaultColumnList.some(
                            (item) => item.value === data.value
                          )
                      )
                      .map((data, i) => {
                        return (
                          <Checkbox
                            key={`${selectedTab}_${i}`}
                            checked={selectedColumnOption.some(
                              (item) => item.value === data.value
                            )}
                            value={data}
                            onChange={handleCheckboxChange}
                          >
                            <Highlighter
                              highlightClassName={styles.highlight}
                              searchWords={[searchColumn]}
                              textToHighlight={data.label}
                            >
                              {data.label}
                            </Highlighter>
                          </Checkbox>
                        )
                      })}
                  </div>
                </div>
              </div>
              <div className={styles.btnGroupColumn}>
                <Button onClick={handleDefault}>
                  {t('activityList.addColumn.default')}
                </Button>
                <div className={styles.btnWrap}>
                  <Button onClick={handleCancel}>
                    {t('activityList.addColumn.cancel')}
                  </Button>
                  <Button type={'primary'} onClick={handleSave}>
                    {t('activityList.addColumn.save')}
                  </Button>
                </div>
              </div>
            </div>
          </CustomScrollbar>
        </div>
      )
    }
    return (
      <div>
        <Popover
          visible={visibleAddColumnPopover && !isMobile}
          content={content}
          title={t('activityList.addColumn.chooseColumn')}
          trigger={'click'}
          placement={'leftTop'}
          overlayClassName={styles.addColumnPopup}
          onVisibleChange={(val) => {
            val ? handleVisible() : handleCancel()
          }}
          overlay={children}
        >
          {children}
        </Popover>
        {isMobile && (
          <Drawer
            title={t('activityList.addColumn.chooseColumn')}
            placement={'bottom'}
            closable={false}
            className={styles.columnMobile}
            onClose={handleCancel}
            visible={visibleAddColumnPopover}
            key={'bottom'}
          >
            <span className={styles.line}></span>
            {content()}
          </Drawer>
        )}
      </div>
    )
  }
)

export default AddColumnPopover
