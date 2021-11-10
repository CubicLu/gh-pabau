import React, { FC, useState, useEffect, useRef } from 'react'
import {
  MyLottie as Lottie,
  Button,
  MedicalFormContact,
  MedicalFormContactData,
} from '@pabau/ui'
import {
  FilterOutlined,
  LockFilled,
  PushpinFilled,
  ExpandAltOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import { Popover, Radio, Space, Form, Select, Tooltip } from 'antd'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import classNames from 'classnames'
import 'react-vertical-timeline-component/style.min.css'
import { Collapse, Drawer } from 'antd'
import { Formik } from 'formik'
import { useMedia } from 'react-use'
import FormAction from './ClientFormAction'
import { useTranslation } from 'react-i18next'
import FormDetails from './ClientFormDetail'
import dayjs from 'dayjs'
import emptyState from '../../assets/lottie/empty-state.json'
import styles from './ClientFormsLayout.module.less'
import { ReactComponent as MedicalHistoryIcon } from '../../assets/images/medical-history.svg'

const { Panel } = Collapse
export interface PopOverStateProps {
  content: boolean
  version: boolean
}

export interface CustomIconComponentProps {
  width: string | number
  height: string | number
  fill: string
  viewBox?: string
  className?: string
  style?: React.CSSProperties
}

interface FormFilterProps {
  id: number
  type: string
  selected: boolean
  icon?: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
}

export interface FormListProps {
  id: number
  name: string
  user: string
  created: string
  type: string
  isPinned: boolean
  isAdminForm: boolean
  data: MedicalFormContactData
}

enum FilterAll {
  first = 0,
}

export interface ClientFormsLayoutProps {
  isEmpty?: boolean
  formFilters: FormFilterProps[]
  forms: MedicalFormContact[]
  onButtonFilterClick: (e: (string | undefined)[]) => Promise<boolean>
  onFilterClick: (
    e: Record<string, string | number | boolean>
  ) => Promise<boolean>
  onPrintClick: (e: MedicalFormContact) => Promise<boolean>
  onShareCick: (e: MedicalFormContact) => Promise<boolean>
  onVersionClick: (e: string) => Promise<boolean>
  onEditClick: (e: MedicalFormContact) => Promise<boolean>
  onPinClick: (e: MedicalFormContact) => Promise<boolean>
  onDeleteClick: (e: MedicalFormContact) => Promise<boolean>
}

export const ClientFormsLayout: FC<ClientFormsLayoutProps> = ({
  isEmpty,
  formFilters,
  forms,
  onButtonFilterClick,
  onFilterClick,
  onPrintClick,
  onShareCick,
  onVersionClick,
  onEditClick,
  onPinClick,
  onDeleteClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [formFilterButtons, setFormFilterButtons] = useState<FormFilterProps[]>(
    []
  )
  const [accordionState, setAccordionState] = useState<(string | number)[]>([])
  const [formState, setFormState] = useState<MedicalFormContact[]>([])
  const [popOverState, setPopOverState] = useState<PopOverStateProps>({
    content: false,
    version: false,
  })

  const [filterpopover, setFilterpopover] = useState<boolean>(false)
  const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)

  const allFilter = [
    {
      id: 0,
      type: 'All',
      selected: true,
    },
  ]
  useEffect(() => {
    window.scrollTo(0, 0)
    if (formFilters?.length) {
      setFormFilterButtons([...allFilter, ...formFilters])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (forms?.length) {
      setFormState(forms)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forms])

  const callBack = (key, id) => {
    const formList = [...accordionState]
    if (formList.includes(id)) {
      formList.splice(formList.indexOf(id), 1)
    } else {
      formList.push(Number.parseInt(key[key.length - 1]))
    }
    setAccordionState(formList)
  }

  const handleFilterButtonClick = (id, selected) => {
    const temp = [...formFilterButtons]
    const formType = temp.map((item) => {
      if (id !== 0 && item.id === id) {
        item.selected = !selected
      } else if (id === 0) {
        item.selected = !selected
      }
      return item
    })
    let count = 0
    for (const item of formType) {
      if (item.selected && item.id !== 0) {
        count += 1
      }
    }
    count === formFilterButtons.length - 1
      ? (formType[FilterAll.first].selected = true)
      : (formType[FilterAll.first].selected = false)
    setFormFilterButtons(formType)
  }

  const ClosedIcon = () => {
    return (
      <div>
        <ExpandAltOutlined />
      </div>
    )
  }
  const OpenIcon = () => {
    return (
      <div>
        <ShrinkOutlined />
      </div>
    )
  }

  const handleClearAllFilter = (resetForm) => {
    resetForm()
    setOpenFilterDrawer((val) => !val)
  }

  const handleExpandAll = () => {
    if (!expanded) {
      setAccordionState(formState.map((item) => item.id))
    } else {
      setAccordionState([])
    }
    setExpanded((val) => !val)
  }

  const handlePinForm = (key) => {
    let formList = [...formState]
    const collapseForms = [...accordionState]
    const formIndex = formList.findIndex((item) => item.id === key)
    if (formIndex >= 0) {
      formList[formIndex]['isPinned'] = !formList[formIndex]['isPinned']
      if (formList[formIndex]['isPinned']) {
        const pinnedForm = formList.splice(formIndex, 1)
        formList = [...pinnedForm, ...formList]
      }
    }
    setPopOverState({ ...popOverState, content: !popOverState['content'] })
    collapseForms.splice(collapseForms.indexOf(key), 1)
    setAccordionState(collapseForms)
    setFormState(formList)
    onPinClick(formList[formIndex])
  }

  const onFilterSubmit = (values) => {
    onFilterClick(values)
    const formList = [...forms]
    const formListData: MedicalFormContact[] = []
    if (values.author === 'All' && values.formName === 'All')
      setFormState(forms)
    else if (values.author === 'All') {
      for (const item of formList) {
        if (item.name.toLowerCase() === values.formName.toLowerCase()) {
          formListData.push(item)
        }
      }
      setFormState(formListData)
    } else if (values.formName === 'All') {
      for (const item of formList) {
        if (item?.data?.patient === values.author) {
          formListData.push(item)
        }
      }
      setFormState(formListData)
    } else {
      for (const item of formList) {
        if (
          item?.data?.patient === values.author &&
          item.name.toLowerCase() === values.formName.toLowerCase()
        ) {
          formListData.push(item)
        }
      }
      setFormState(formListData)
    }
    if (isMobile) setOpenFilterDrawer((val) => !val)
  }

  const filterContent = (values, setFieldValue, handleSubmit, resetForm) => {
    return (
      <div className={styles.customFilterWrapper}>
        <h3>{t('ui.clientcard.forms.filterby')}</h3>
        <h4>{t('ui.clientcard.forms.author')}</h4>
        <div className={styles.authorWrapper}>
          <Radio.Group
            value={values.author}
            onChange={(e) => setFieldValue('author', e.target.value)}
          >
            <Space direction="vertical">
              <Radio value={'All'} className={styles.authorText} defaultChecked>
                {t('ui.clientcard.forms.all')}
              </Radio>
              <Radio value={'Bruno Ballardin'} className={styles.authorText}>
                {t('ui.clientcard.forms.filter.author.bruno')}
              </Radio>
              <Radio value={'Alisa Moor'} className={styles.authorText}>
                {t('ui.clientcard.forms.filter.author.alisa')}
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        <Form layout="vertical">
          <div className={styles.formSelectionWrapper}>
            <Form.Item label="Form Name">
              <Select
                defaultValue="all"
                value={values.formName}
                onSelect={(val) => setFieldValue('formName', val)}
              >
                <Select.Option value="All">
                  {t('ui.clientcard.forms.all')}
                </Select.Option>
                {forms?.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name.toLowerCase()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.filterApplyBtn}>
          <Button
            type={isMobile ? undefined : 'text'}
            onClick={() => handleClearAllFilter(resetForm)}
          >
            {t('ui.clientcard.forms.clearall')}
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            {t('ui.clientcard.forms.apply')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.clientLayout} ref={ref}>
      {isEmpty ? (
        <Lottie
          options={{
            loop: true,
            autoPlay: true,
            animationData: emptyState,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      ) : (
        <div className={styles.formListWrapper}>
          <div className={styles.headerFilter}>
            <div className={styles.filterBtnWrapper}>
              {formFilterButtons?.map((item) => {
                if (item?.type === 'All') {
                  return (
                    <div key={item.id} className={styles.allFilterWrapper}>
                      <span
                        className={styles.allFilterText}
                        onClick={() =>
                          handleFilterButtonClick(item.id, item.selected)
                        }
                        style={
                          item.selected
                            ? { color: '#54b2d3' }
                            : { color: '#9292a3' }
                        }
                      >
                        {item.type}
                      </span>
                    </div>
                  )
                } else {
                  return (
                    <Tooltip key={item.id} placement="bottom" title={item.type}>
                      <div
                        className={
                          item.selected
                            ? classNames(styles.filterBtn, styles.active)
                            : styles.filterBtn
                        }
                        onClick={() =>
                          handleFilterButtonClick(item.id, item.selected)
                        }
                      >
                        {item.icon && React.createElement(item.icon)}
                      </div>
                    </Tooltip>
                  )
                }
              })}
            </div>
            <div className={styles.filterIconBtn}>
              <Formik
                initialValues={{
                  author: 'All',
                  formName: 'All',
                }}
                onSubmit={(values) => {
                  onFilterSubmit(values)
                }}
              >
                {({ values, setFieldValue, handleSubmit, resetForm }) =>
                  isMobile ? (
                    <>
                      <FilterOutlined
                        onClick={() => setOpenFilterDrawer((val) => !val)}
                      />
                      <Drawer
                        placement={'bottom'}
                        closable={false}
                        onClose={() => setOpenFilterDrawer((val) => !val)}
                        visible={openFilterDrawer}
                        key={'bottom'}
                        height="347px"
                        className={styles.mobileDrawer}
                      >
                        <div className={styles.mobileDrawerWrapper}>
                          <span className={styles.line} />
                          {filterContent(
                            values,
                            setFieldValue,
                            handleSubmit,
                            resetForm
                          )}
                        </div>
                      </Drawer>
                    </>
                  ) : (
                    <Popover
                      visible={filterpopover}
                      content={filterContent(
                        values,
                        setFieldValue,
                        handleSubmit,
                        resetForm
                      )}
                      trigger="click"
                      overlayClassName={styles.customPopover}
                      onVisibleChange={(val) => setFilterpopover(val)}
                    >
                      <FilterOutlined
                        style={
                          filterpopover
                            ? { color: '#54b2d3' }
                            : { color: '#9292a3' }
                        }
                      />
                    </Popover>
                  )
                }
              </Formik>
            </div>
            <div className={styles.expandAllBtn}>
              <Tooltip
                placement="bottom"
                title={
                  !expanded
                    ? t('ui.clientcard.forms.headerfilter.expandall')
                    : t('ui.clientcard.forms.headerfilter.shrinkall')
                }
              >
                <div className={styles.expandAll} onClick={handleExpandAll}>
                  {expanded ? <ShrinkOutlined /> : <ExpandAltOutlined />}
                </div>
              </Tooltip>
            </div>
          </div>
          {formState.length > 0 ? (
            <VerticalTimeline layout={'1-column-left'} animate={false}>
              {formState?.map((indform) => {
                return (
                  <VerticalTimelineElement
                    key={indform.id}
                    className={classNames(
                      'vertical-timeline-element--work',
                      styles.formListClass
                    )}
                    iconStyle={{
                      background: '#3D9588',
                      color: ' #FFFFFF',
                    }}
                    icon={React.createElement(MedicalHistoryIcon)}
                  >
                    <div
                      className={
                        accordionState.includes(indform.id)
                          ? styles.mainCollapseDivAfter
                          : indform.isPinned
                          ? classNames(
                              styles.mainCollapseDiv,
                              styles.pinnedFormCollapse
                            )
                          : styles.mainCollapseDiv
                      }
                    >
                      <Collapse
                        activeKey={accordionState}
                        onChange={(e) => callBack(e, indform.id)}
                        expandIcon={
                          accordionState.includes(indform.id)
                            ? OpenIcon
                            : ClosedIcon
                        }
                        ghost={true}
                      >
                        <Panel
                          header={
                            <div className={styles.headerMain}>
                              <div className={styles.timeEleWrap}>
                                <span className={styles.formsName}>
                                  {indform.name}
                                  {indform.isPinned && (
                                    <PushpinFilled
                                      className={styles.pinnedForm}
                                    />
                                  )}
                                </span>
                                <span className={styles.formsDetail}>
                                  <p>
                                    {`${dayjs(indform?.created).format(
                                      'DD MMM YYYY, h:mm A'
                                    )} | ${indform?.user}`}
                                  </p>
                                  {indform.isAdminForm && (
                                    <span className={styles.administratorForm}>
                                      <LockFilled />
                                      <h3>Doctors</h3>
                                    </span>
                                  )}
                                </span>
                              </div>
                              {accordionState.includes(indform.id) && (
                                <FormAction
                                  form={indform}
                                  popOverState={popOverState}
                                  setPopOverState={setPopOverState}
                                  handlePinForm={() =>
                                    handlePinForm(indform.id)
                                  }
                                  onPrintClick={onPrintClick}
                                  onShareCick={onShareCick}
                                  onVersionClick={onVersionClick}
                                  onEditClick={onEditClick}
                                  onDeleteClick={onDeleteClick}
                                />
                              )}
                            </div>
                          }
                          key={indform.id}
                        >
                          <FormDetails formData={indform.data} />
                        </Panel>
                      </Collapse>
                    </div>
                  </VerticalTimelineElement>
                )
              })}
            </VerticalTimeline>
          ) : (
            <div className={styles.emptyData}>
              {t('ui.clientcard.forms.nodata')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ClientFormsLayout
