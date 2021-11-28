import React, {
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react'
import { Drawer, Input, Popover } from 'antd'
import { CheckOutlined, TagFilled, TagOutlined } from '@ant-design/icons'
import {
  ColorPicker,
  Notification,
  NotificationType,
  Button,
  CustomIcon,
} from '@pabau/ui'
import styles from '../../pages/activities/index.module.less'
import { Labels } from '../../pages/clients'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { differenceBy } from 'lodash'
import { useMedia } from 'react-use'
import { customColorData } from '../../mocks/Activities'
import {
  useUpdateOneCmLabelMutation,
  useCreateOneCmLabelMutation,
  useDeleteOneCmContactLabelMutation,
  useCreateOneCmContactLabelMutation,
} from '@pabau/graphql'
import { useUser } from '../../context/UserContext'

export interface refProps {
  handleVisible?: (val) => void
}

interface CreateLabelsProps {
  children?: ReactNode
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  selectedLabels?: Labels[]
  setSelectedLabels?: (val: Labels[]) => void
  fromHeader?: boolean
  defaultSelectedLabels?: Labels[]
  setDefaultSelectedLabels?: (val: Labels[]) => void
  handleApplyLabel?: (val) => void
  handleClose?: (val) => void
  contactId: number
  ref?: ForwardedRef<refProps>
}

export const CreateLabels: FC<CreateLabelsProps> = forwardRef(
  (
    {
      children,
      labels,
      setLabels,
      selectedLabels,
      setSelectedLabels,
      fromHeader = false,
      defaultSelectedLabels = [],
      handleApplyLabel,
      handleClose,
      contactId,
    },
    ref
  ) => {
    const { t } = useTranslationI18()
    const loggedUser = useUser()
    const isMobile = useMedia('(max-width: 768px)', false)
    const [visible, setVisible] = useState(false)
    const [newLabel, setNewLabel] = useState<Labels>({
      label: '',
      color: '',
      id: 0,
    })
    const [selectedColor, setSelectedColor] = useState('')
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number>()
    const [selectedEditData, setSelectedEditData] = useState<Labels>({
      label: '',
      color: '',
      id: 0,
    })
    const [editLabel] = useUpdateOneCmLabelMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('update.activity.record.success.message')
        )
      },
    })
    const [addLabel] = useCreateOneCmLabelMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('update.activity.record.success.message')
        )
      },
    })
    const [deleteCmContactLabel] = useDeleteOneCmContactLabelMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('update.activity.record.success.message')
        )
      },
    })
    const [createCmContactLabel] = useCreateOneCmContactLabelMutation({
      onCompleted() {
        Notification(
          NotificationType.success,
          t('update.activity.record.success.message')
        )
      },
    })

    useImperativeHandle(ref, () => ({
      handleVisible: handleVisible,
    }))

    const editLabelData = async (valueObject) => {
      const labelData = [...labels]
      const labelIndex = labelData.findIndex(
        (label) => label.label === selectedEditData.label
      )
      labelIndex !== -1 && labelData.splice(labelIndex, 1, valueObject)
      const selectedLabelData = [...selectedLabels]
      const selectedLabelIndex = selectedLabelData.findIndex(
        (label) => label.label === selectedEditData.label
      )
      selectedLabelIndex !== -1 &&
        selectedLabelData.splice(selectedLabelIndex, 1, valueObject)
      const index = labelData.findIndex(
        (label) => label.label === valueObject.label
      )
      if (index === -1 || index === editIndex) {
        await editLabel({
          variables: {
            where: {
              id: valueObject?.id,
            },
            data: {
              name: {
                set: valueObject?.label,
              },
              color: {
                set: valueObject?.color,
              },
            },
          },
        })
        setLabels([...labelData])
        setSelectedLabels([...selectedLabelData])
        fromHeader && handleApplyLabel([...selectedLabelData])
      } else {
        Notification(
          NotificationType.error,
          t('clients.content.button.sameLabelExist')
        )
      }
      setIsEdit(false)
    }

    const addLabelData = async (valueObject) => {
      if (!labels.some((item) => item.label === valueObject?.label)) {
        contactId &&
          (await addLabel({
            variables: {
              data: {
                name: valueObject?.label,
                color: valueObject?.color,
                Company: {},
                CmContactLabel: {
                  create: [
                    {
                      Company: {
                        connect: {
                          id: loggedUser?.me?.company,
                        },
                      },
                      CmContact: {
                        connect: {
                          ID: contactId,
                        },
                      },
                    },
                  ],
                },
              },
            },
          }))
        setLabels([...labels, valueObject])
        setSelectedLabels([...selectedLabels, valueObject])
        fromHeader && handleApplyLabel([...selectedLabels, valueObject])
      } else {
        Notification(
          NotificationType.error,
          t('clients.content.button.sameLabelExist')
        )
      }
    }

    const handleKeyPress = async (e) => {
      const {
        target: { value },
        key,
      } = e
      if (key === 'Enter' && value) {
        if (isEdit) {
          await editLabelData({
            label: value,
            color: selectedColor,
            id: newLabel?.id,
          })
        } else {
          await addLabelData({ label: value, color: selectedColor, id: 0 })
        }
        setNewLabel({ label: '', color: '', id: 0 })
        setVisible(false)
        setDisplayColorPicker(false)
        setSelectedColor('')
      }
    }

    const handleVisible = async (value) => {
      if (isEdit) {
        await editLabelData({
          label: newLabel.label,
          color: selectedColor,
          id: newLabel?.id,
        })
      } else if (!value && newLabel.label) {
        await addLabelData({
          label: newLabel.label,
          color: selectedColor,
          id: 0,
        })
      }
      setNewLabel({ label: '', color: '', id: 0 })
      setVisible(value)
      setDisplayColorPicker(false)
      setSelectedColor('')
      setIsEdit(false)
    }

    const handleSelect = (label, index) => {
      const selectedData = [...selectedLabels]
      if (selectedData.some((item) => item.label === label.label)) {
        const selectedIndex = selectedLabels.findIndex(
          (selectedLabel) => selectedLabel.label === labels[index].label
        )
        selectedIndex !== -1 && selectedData.splice(selectedIndex, 1)
        setSelectedLabels(selectedData)
      } else {
        selectedData.push(label)
        setSelectedLabels(selectedData)
      }
    }

    const handleDropletClick = (e, label, index) => {
      e.stopPropagation()
      setDisplayColorPicker(true)
      setNewLabel(label)
      setIsEdit(true)
      setSelectedEditData(label)
      setSelectedColor(label.color)
      setEditIndex(index)
    }

    const sameAsDefault = () => {
      if (selectedLabels?.length !== defaultSelectedLabels?.length) {
        return false
      }
      const diff1 =
        differenceBy(selectedLabels, defaultSelectedLabels, (obj) => {
          return obj.label + obj.color
        }) || []
      const diff2 =
        differenceBy(defaultSelectedLabels, selectedLabels, (obj) => {
          return obj.label + obj.color
        }) || []
      return diff1.length === 0 && diff2.length === 0
    }

    const onApplyLabel = async () => {
      const createCmLabel = differenceBy(
        selectedLabels,
        defaultSelectedLabels,
        'id'
      )
      const deleteCmLabel = differenceBy(
        defaultSelectedLabels,
        selectedLabels,
        'id'
      )
      if (deleteCmLabel?.length > 0) {
        for (const label of deleteCmLabel) {
          label?.cmContactLabelId &&
            (await deleteCmContactLabel({
              variables: {
                where: {
                  id: label.cmContactLabelId,
                },
              },
            }))
        }
      }
      if (createCmLabel?.length > 0) {
        for (const label of createCmLabel) {
          await createCmContactLabel({
            variables: {
              data: {
                Company: {},
                CmContact: {
                  connect: {
                    ID: contactId,
                  },
                },
                CmLabel: {
                  connect: {
                    id: label?.id,
                  },
                },
              },
            },
          })
        }
      }
      handleApplyLabel(selectedLabels)
      setVisible(false)
    }

    const content = () => {
      return (
        <div className={styles.fullWidth}>
          <div className={styles.scrollerTag}>
            {labels.map((label, index) => {
              return (
                <div key={index}>
                  {label?.label && (
                    <span
                      style={{ display: 'flex', flexDirection: 'row' }}
                      key={index}
                      onClick={() => handleSelect(label, index)}
                      className={styles.tagWrap}
                    >
                      <div className={styles.tagLayout}>
                        {label.color ? (
                          <TagFilled style={{ color: label.color }} />
                        ) : (
                          <TagOutlined />
                        )}
                        <div
                          className={styles.dropLayout}
                          style={{ backgroundColor: label.color }}
                          onClick={(e) => handleDropletClick(e, label, index)}
                        >
                          <CustomIcon name={'droplet'} />
                        </div>
                      </div>
                      <div className={styles.tagName}>{label.label}</div>
                      {selectedLabels?.some(
                        (item) => item.label === label.label
                      ) && <CheckOutlined />}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          {!fromHeader || sameAsDefault() ? (
            <div
              onMouseMove={() => setDisplayColorPicker(true)}
              onMouseLeave={() => setDisplayColorPicker(false)}
            >
              <div className={styles.inputLine}>
                {selectedColor ? (
                  <TagFilled style={{ color: selectedColor }} />
                ) : (
                  <TagOutlined />
                )}
                <Input
                  autoComplete={'off'}
                  size="middle"
                  name={'label'}
                  value={newLabel?.label}
                  onChange={(e) =>
                    setNewLabel({
                      ...newLabel,
                      label: e.target.value,
                      color: selectedColor,
                    })
                  }
                  onKeyDown={handleKeyPress}
                  placeholder={t('clients.content.button.newLabel')}
                />
              </div>
              {displayColorPicker && (
                <div className={styles.tagCustomWrap}>
                  <ColorPicker
                    className={styles.tagColorPicker}
                    heading=""
                    onSelected={(val) => setSelectedColor(val)}
                    selectedColor={selectedColor}
                    isRoundColorPicker={true}
                    customColorData={customColorData}
                  />
                </div>
              )}
            </div>
          ) : (
            <Button className={styles.applyBtn} onClick={onApplyLabel}>
              {t('common-label-apply')}
            </Button>
          )}
        </div>
      )
    }

    return (
      <>
        <Popover
          visible={!isMobile && visible}
          content={content}
          title={t('clients.leftSidebar.addLabels')}
          trigger={'click'}
          placement={'bottom'}
          overlayClassName={styles.tagModal}
          onVisibleChange={(val) => {
            !val && handleVisible(val)
            handleClose(val)
          }}
          overlay={children}
        >
          {children}
        </Popover>
        {isMobile && (
          <Drawer
            title={t('clients.leftSidebar.addLabels')}
            placement={'bottom'}
            closable={false}
            className={styles.statusMobileDrawer}
            onClose={() => {
              handleVisible(false)
              handleClose(false)
            }}
            visible={visible}
            key={'bottom'}
          >
            <span className={styles.line}></span>
            {content()}
          </Drawer>
        )}
      </>
    )
  }
)

export default CreateLabels
