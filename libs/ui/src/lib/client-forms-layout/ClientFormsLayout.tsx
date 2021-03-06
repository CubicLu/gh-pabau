import React, { FC, useState, useEffect, useRef, createRef } from 'react'
import {
  MyLottie as Lottie,
  Button,
  MedicalFormContact,
  MedicalFormContactData,
  ContactMedicalCondition,
  ContactMedicalLabTest,
} from '@pabau/ui'
import {
  FilterOutlined,
  LockFilled,
  PushpinFilled,
  ExpandAltOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import { Popover, Radio, Space, Form, Select, Tooltip, Modal } from 'antd'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import ClientFormsSkeleton from './ClientFormsSkeleton'
// import { ReactComponent as LabOrderIcon } from '../../assets/images/lab.svg'
import { ReactComponent as MedicalHistoryIcon } from '../../assets/images/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/note.svg'
import { ReactComponent as Pencil } from '../../assets/images/pencil.svg'
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

const mapIdsWithValues = ({
  allForms,
  reqForms,
  valuesData,
  clsClass,
  matchingIndex,
}) => {
  for (const form of reqForms) {
    const index = allForms?.findIndex((el) => el?.id === form?.id)
    if (index !== -1) {
      const cForm = allForms[index]
      const detailIndex = cForm?.data?.details?.findIndex(
        (el) => el?.content && el?.clsClass === clsClass
      )
      if (detailIndex !== -1) {
        const tarDetail = cForm?.data?.details?.[detailIndex]
        let labels = ''
        const ids = tarDetail?.content?.split(',')?.map((el) => Number(el))
        if (valuesData?.length) {
          const conditions = valuesData
            ?.filter((el) => ids?.includes(el?.[matchingIndex]))
            ?.map((el) => el?.name)
          labels = conditions?.join(', ')
        }
        cForm?.data?.details?.splice(detailIndex, 1, {
          ...tarDetail,
          content: labels,
        })
      }
      allForms?.splice(index, 1, cForm)
    }
  }
  return allForms
}

export const basicFormFilters = [
  {
    id: 1,
    key: 'treatment',
    type: 'Treatment',
    selected: true,
    icon: Note,
  },
  {
    id: 2,
    key: 'consent',
    type: 'Consent',
    selected: true,
    icon: Pencil,
  },
  {
    id: 3,
    key: 'questionnaire',
    type: 'Medical History',
    selected: true,
    icon: MedicalHistoryIcon,
  },
  // {
  //   id: 4,
  //   key: 'prescription',
  //   type: 'Lab Request',
  //   selected: true,
  //   icon: LabOrderIcon,
  // },
]

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

export interface FormFilterProps {
  id: number
  type: string
  selected: boolean
  key?: string
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
  loading?: boolean
  formFilterButtons: FormFilterProps[]
  setFormFilterButtons: (e: FormFilterProps[]) => void
  forms: MedicalFormContact[]
  formConditions?: ContactMedicalCondition[]
  formLabTests?: ContactMedicalLabTest[]
  onFilterClick: (
    e: Record<string, string | number | boolean>
  ) => Promise<boolean>
  onShareCick: (e: MedicalFormContact) => Promise<boolean>
  onVersionClick: (e: string) => Promise<boolean>
  onEditClick: (e: MedicalFormContact) => Promise<boolean>
  onPinClick: (formId: number) => void
  onDeleteClick: (formContactId: number) => void
  userPermission?: boolean
  deleteFormContactLoading?: boolean
}

export const ClientFormsLayout: FC<ClientFormsLayoutProps> = ({
  loading,
  formFilterButtons,
  setFormFilterButtons,
  forms = [],
  formConditions = [],
  formLabTests = [],
  onFilterClick,
  onShareCick,
  onVersionClick,
  onPinClick,
  onDeleteClick,
  userPermission,
  deleteFormContactLoading,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)

  const [loader, setLoader] = useState(loading)
  const [accordionState, setAccordionState] = useState<(string | number)[]>([])
  const [formState, setFormState] = useState<MedicalFormContact[]>([])
  const [popOverState, setPopOverState] = useState<PopOverStateProps>({
    content: false,
    version: false,
  })
  const [deleteFormId, setDeleteFormId] = useState<number | null>(null)
  const [deleteFormModal, setDeleteFormModal] = useState(false)

  const [filterpopover, setFilterpopover] = useState<boolean>(false)
  const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)

  useEffect(() => {
    if (loading) {
      setLoader(() => true)
    } else {
      setTimeout(() => {
        setLoader(() => false)
      }, 500)
    }
  }, [loading])

  useEffect(() => {
    setDeleteFormModal(() => false)
    setFormState(forms)
  }, [forms])

  useEffect(() => {
    if (forms?.length) {
      let cForms = [...forms]
      const conditionForms = cForms?.filter((el) => {
        return el?.data?.details?.find(
          (e) => e?.content && e?.clsClass === 'btn_medical_condition'
        )
      })
      cForms = mapIdsWithValues({
        allForms: cForms,
        reqForms: conditionForms,
        valuesData: formConditions,
        clsClass: 'btn_medical_condition',
        matchingIndex: 'id',
      })
      setFormState(cForms)
    }
  }, [forms, formConditions])

  useEffect(() => {
    if (forms?.length) {
      let cForms = [...forms]
      const labsForms = cForms?.filter((el) => {
        return el?.data?.details?.find(
          (e) => e?.content && e?.clsClass === 'btn_medical_condition'
        )
      })
      cForms = mapIdsWithValues({
        allForms: cForms,
        reqForms: labsForms,
        valuesData: formLabTests,
        clsClass: 'labs_tests',
        matchingIndex: 'product_id',
      })
      setFormState(cForms)
    }
  }, [forms, formLabTests])

  const onCollapse = (key, id) => {
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

  const onFilterSubmit = (values) => {
    onFilterClick(values)
    const formList = [...forms]
    const formListData: MedicalFormContact[] = []
    if (values.author === 'All' && values.formName === 'All')
      setFormState(forms)
    else if (values.author === 'All') {
      for (const item of formList) {
        if (item?.name?.toLowerCase() === values.formName.toLowerCase()) {
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
          item?.name?.toLowerCase() === values.formName.toLowerCase()
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
                    {item?.name?.toLowerCase()}
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

  const handleDeleteFormContact = (formId: number) => {
    setDeleteFormId(formId)
    setDeleteFormModal(true)
  }

  return (
    <div className={styles.clientLayout} ref={ref}>
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
        {!loader && formState?.length <= 0 && (
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
        )}
        {!loader && formState?.length > 0 ? (
          <VerticalTimeline layout={'1-column-left'} animate={false}>
            {formState?.map((form) => {
              return (
                <VerticalTimelineElement
                  key={form.id}
                  className={classNames(
                    'vertical-timeline-element--work',
                    styles.formListClass
                  )}
                  iconStyle={{
                    background: '#3D9588',
                    color: ' #FFFFFF',
                  }}
                  icon={React.createElement(
                    basicFormFilters?.find((el) => el?.key === form.type)
                      ?.icon || MedicalHistoryIcon
                  )}
                >
                  <div
                    className={
                      accordionState.includes(form.id)
                        ? styles.mainCollapseDivAfter
                        : form.isPinned
                        ? classNames(
                            styles.mainCollapseDiv,
                            styles.pinnedFormCollapse
                          )
                        : styles.mainCollapseDiv
                    }
                  >
                    <Collapse
                      activeKey={accordionState}
                      onChange={(e) => onCollapse(e, form.id)}
                      expandIcon={
                        accordionState.includes(form.id) ? OpenIcon : ClosedIcon
                      }
                      ghost={true}
                    >
                      <Panel
                        header={
                          <div className={styles.headerMain}>
                            <div className={styles.timeEleWrap}>
                              <span className={styles.formsName}>
                                {form.name}
                                {form.isPinned && (
                                  <PushpinFilled
                                    className={styles.pinnedForm}
                                  />
                                )}
                              </span>
                              <span className={styles.formsDetail}>
                                <p>
                                  {`${dayjs(form?.created).format(
                                    'DD MMM YYYY, h:mm A'
                                  )} | ${form?.user}`}
                                </p>
                                {form.isAdminForm && (
                                  <span className={styles.administratorForm}>
                                    <LockFilled />
                                    <h3>Doctors</h3>
                                  </span>
                                )}
                              </span>
                            </div>
                            {accordionState.includes(form.id) && (
                              <FormAction
                                form={form}
                                popOverState={popOverState}
                                userPermission={userPermission}
                                setPopOverState={setPopOverState}
                                handlePinForm={() => onPinClick?.(form.id)}
                                onShareCick={onShareCick}
                                onVersionClick={onVersionClick}
                                onDeleteClick={handleDeleteFormContact}
                              />
                            )}
                          </div>
                        }
                        key={form.id}
                      >
                        <FormDetails formData={form.data} formId={form.id} />
                      </Panel>
                    </Collapse>
                  </div>
                </VerticalTimelineElement>
              )
            })}
          </VerticalTimeline>
        ) : (
          loader && <ClientFormsSkeleton length={formState?.length} />
        )}
      </div>
      <Modal
        centered={true}
        onCancel={() => {
          setDeleteFormId(null)
          setDeleteFormModal(false)
        }}
        onOk={() => {
          const deleteForm = formState?.find((el) => el?.id === deleteFormId)
          if (deleteFormId && deleteForm) onDeleteClick?.(deleteFormId)
        }}
        visible={deleteFormModal}
        title={t('galley.list.view.delete.modal.title')}
        cancelText={t('common-label-cancel')}
        okText={t('galley.list.view.delete.ok.button')}
        confirmLoading={deleteFormContactLoading}
      >
        <div>
          <p>
            {t('ui.clientcard.forms.modal.delete.desc', {
              what: formState?.find((el) => el?.id === deleteFormId)?.name,
            })}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default ClientFormsLayout
