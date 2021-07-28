import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Input, Popover } from 'antd'
import { CheckOutlined, TagFilled, TagOutlined } from '@ant-design/icons'
import {
  ColorPicker,
  Notification,
  NotificationType,
  Button,
  CustomIcon,
} from '@pabau/ui'
import {
  GetFeatureFlagsDocument,
  useAddLabelMutation,
  useGetContactsLabelsQuery,
  useInsertContactsLabelsMutation,
  useGetLabelsLazyQuery,
  // useGetLabelsQuery,
} from '@pabau/graphql'
import styles from '../../pages/clients/clients.module.less'
import { Labels } from '../../pages/clients'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { differenceBy } from 'lodash'

interface CreateLabelsProps {
  children?: ReactNode
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  // selectedLabels?: Labels[]
  selectedLabels?: any
  setSelectedLabels?: (val) => void
  fromHeader?: boolean
  defaultSelectedLabels?: any
  setDefaultSelectedLabels?: (val) => void
  handleApplyLabel?: (val) => void
  testLabels?: any
  selectedRowKeys?: any
  setTestLabels?: (val) => void
  getContactsLabelsQuery?: () => any
  // getLabelsQuery?: () => any
  sourceData?: any
}

const customColorData = [
  '#f45ec5',
  '#f32288',
  '#b23651',
  '#7b5345',
  '#f46514',
  '#faca00',
  '#c8b533',
  '#a3d200',
  '#2a7e4b',
  '#619dff',
  '#77ccff',
  '#744fd4',
  '#808080',
  '#333333',
  '#f57670',
  '#f3a3f2',
  '#f8aeab',
  '#793d8c',
  '#9cadbe',
  '#70a1bf',
  '#2a5193',
  '#66ccc7',
  '#555ce3',
  '#3d1d97',
  '#543e3d',
  '#bbaafc',
  '#3978e9',
  '#abbfea',
  '#d176b0',
  '#9d99ba',
  '#ab9678',
  '#bce9fa',
  '#b8816b',
  '#255a64',
]

export const CreateLabels: FC<CreateLabelsProps> = ({
  children,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  fromHeader = false,
  defaultSelectedLabels = [],
  handleApplyLabel,
  testLabels,
  selectedRowKeys,
  setTestLabels,
  getContactsLabelsQuery,
  // getLabelsQuery,
  sourceData,
}) => {
  const { t } = useTranslationI18()
  const [visible, setVisible] = useState(false)

  const [newLabel, setNewLabel] = useState({
    text: '',
    color: '',
    count: 0,
  })
  const [selectedColor, setSelectedColor] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState<number>()
  // const [selectedEditData, setSelectedEditData] = useState<Labels>({
  //   label: '',
  //   color: '',
  //   count: 0,
  // })
  const [selectedEditData, setSelectedEditData] = useState({
    text: '',
    color: '',
    count: 0,
  })
  const [selectedContacts, setSelectedContacts] = useState([])
  const [responseSelectedContact, setResponseSelectedContcat] = useState({})

  console.log('responseSelectedContact:', responseSelectedContact)

  // const [
  //   addLabelMutaton,
  //   { data: addlabelData, loading: addLabelLoading, error: addLabelError },
  // ] = useAddLabelMutation()

  const [tempSelectedContact, setTempSelectedContact] = useState([])

  const [addLabelMutaton] = useAddLabelMutation({
    fetchPolicy: 'no-cache',
    onCompleted(response) {
      console.log('on COMPLETE adding label', response.insert_labels_one.id)
      const responseLabel = {
        id: response.insert_labels_one.id,
        text: response.insert_labels_one.text,
        color: response.insert_labels_one.color,
      }
      setResponseSelectedContcat(responseLabel)
      // setSelectedLabels([responseLabel])
      getLabelsQuery()
      // insertContactsLabelsMutaton()
      // onApplyLabel()
      return responseLabel
    },
    onError(error) {
      console.log('not added label')
    },
  })

  const [getLabelsQuery, { data: getLabelsData }] = useGetLabelsLazyQuery({
    fetchPolicy: 'no-cache',
  })

  // const editLabelData = (valueObject) => {
  //   const labelData = [...labels]
  //   const labelIndex = labelData.findIndex(
  //     (label) => label.label === selectedEditData.label
  //   )
  //   labelIndex !== -1 && labelData.splice(labelIndex, 1, valueObject)
  //   const selectedLabelData = [...selectedLabels]
  //   const selectedLabelIndex = selectedLabelData.findIndex(
  //     (label) => label.label === selectedEditData.label
  //   )
  //   selectedLabelIndex !== -1 &&
  //     selectedLabelData.splice(selectedLabelIndex, 1, valueObject)
  //   const index = labelData.findIndex(
  //     (label) => label.label === valueObject.label
  //   )
  //   if (index === -1 || index === editIndex) {
  //     setLabels([...labelData])
  //     setSelectedLabels([...selectedLabelData])
  //     fromHeader && handleApplyLabel([...selectedLabelData])
  //   } else {
  //     Notification(
  //       NotificationType.error,
  //       t('clients.content.button.sameLabelExist')
  //     )
  //   }
  //   setIsEdit(false)
  // }
  // console.log('isEdit:', isEdit)

  const [
    insertContactsLabelsMutaton,
    {
      data: insertContactsLabelsData,
      loading: insertContactsLabelsLoading,
      error: insertContactsLabelsError,
    },
  ] = useInsertContactsLabelsMutation({
    onCompleted(response) {
      console.log('added contactslabels')
      // getLabelsQuery()
    },
    onError(error) {
      console.log('not added contactslabels')
    },
  })

  const editLabelData = (valueObject) => {
    const labelData = [...testLabels.labels]
    // console.log('testLabels on edit:', testLabels)
    // console.log('valueObject on edit:', valueObject)
    // console.log('labelData on edit:', labelData)
    const labelIndex = labelData.findIndex(
      (label) => label.text === selectedEditData.text
    )
    labelIndex !== -1 && labelData.splice(labelIndex, 1, valueObject)
    const selectedLabelData = [...selectedLabels]
    const selectedLabelIndex = selectedLabelData.findIndex(
      (label) => label.text === selectedEditData.text
    )
    selectedLabelIndex !== -1 &&
      selectedLabelData.splice(selectedLabelIndex, 1, valueObject)
    const index = labelData.findIndex(
      (label) => label.text === valueObject.text
    )
    if (index === -1 || index === editIndex) {
      setTestLabels([...labelData])
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

  // const addLabelData = (valueObject) => {
  //   if (!labels.some((item) => item.label === valueObject.label)) {
  //     setLabels([...labels, valueObject])
  //     setSelectedLabels([...selectedLabels, valueObject])
  //     fromHeader && handleApplyLabel([...selectedLabels, valueObject])
  //   } else {
  //     Notification(
  //       NotificationType.error,
  //       t('clients.content.button.sameLabelExist')
  //     )
  //   }
  // }

  // if (selectedRowKeys && selectedRowKeys.length > 0) {
  //   for (const selContact of selectedRowKeys) {
  //     console.log('selContact', selContact)
  //   }
  // }

  const addLabelData = async (valueObject) => {
    if (
      testLabels?.labels.some(
        (item) => item.text && item.color !== valueObject.text
      )
    ) {
      console.log('added new label', newLabel)
      console.log('testLabels on ADDING:', testLabels)
      console.log('valueObject:', valueObject)
      // console.log('testLabels.labels :', testLabels.labels)
      // setTestLabels({[...testLabels, valueObject]})
      // testLabels.labels.push(valueObject)
      // setTestLabels(() => [...testLabels, valueObject])
      testLabels.labels.push(valueObject)

      setSelectedLabels([...selectedLabels, valueObject])
      fromHeader && handleApplyLabel([...selectedLabels, valueObject])
      await addLabelMutaton({
        variables: {
          text: newLabel.text,
          color: newLabel.color,
        },
      })
      getLabelsQuery()
    } else {
      Notification(
        NotificationType.error,
        t('clients.content.button.sameLabelExist')
      )
    }
  }

  // console.log('testLabels UPDATEDB:', testLabels)

  // const handleKeyPress = (e) => {
  //   console.log('on 1111 key press')
  //   const {
  //     target: { value },
  //     key,
  //   } = e
  //   if (key === 'Enter' && value) {
  //     if (isEdit) {
  //       editLabelData({ text: value, color: selectedColor, count: 0 })
  //       // getLabelsQuery()
  //     } else {
  //       addLabelData({ text: value, color: selectedColor, count: 0 })
  //       // getLabelsQuery()
  //     }
  //     setNewLabel({ text: '', color: '', count: 0 })
  //     setVisible(false)
  //     setDisplayColorPicker(false)
  //     setSelectedColor('')
  //   }
  // }

  const handleKeyPress = (e) => {
    console.log('on 1111 key press')
    console.log('responseSelectedContact keypress', responseSelectedContact)
    const {
      target: { value },
      key,
    } = e

    if (key === 'Enter' && value) {
      // onApplyLabel()
      if (isEdit) {
        editLabelData({ text: value, color: selectedColor, count: 0 })
        // getLabelsQuery()
        // onApplyLabel()
      } else {
        addLabelData({ text: value, color: selectedColor, count: 0 })
        // getLabelsQuery()
      }
      setNewLabel({ text: '', color: '', count: 0 })
      setVisible(false)
      setDisplayColorPicker(false)
      setSelectedColor('')
      // await onApplyLabel()
      // onApplyLabel()
    }
  }

  const handleVisible = (value) => {
    if (isEdit) {
      editLabelData({ text: newLabel.text, color: selectedColor, count: 0 })
    } else if (!value && newLabel.text) {
      addLabelData({ text: newLabel.text, color: selectedColor, count: 0 })
    }
    setNewLabel({ text: '', color: '', count: 0 })
    setVisible(value)
    setDisplayColorPicker(false)
    setSelectedColor('')
    setIsEdit(false)
  }

  // WORKING handleSELECT DO NOT DELETE
  // const handleSelect = (label, index) => {
  //   const selectedData = [...selectedLabels]
  //   if (selectedData.some((item) => item.text === label.text)) {
  //     const selectedIndex = selectedLabels?.findIndex(
  //       (selectedLabel) => selectedLabel.text === testLabels.labels[index].text
  //     )
  //     selectedIndex !== -1 && selectedData.splice(selectedIndex, 1)
  //     setSelectedLabels(selectedData)
  //   } else {
  //     selectedData.push(label)
  //     setSelectedLabels(selectedData)
  //   }
  //   console.log('selectedDataa:', selectedData)
  // }

  const handleSelect = (label, index) => {
    const selectedData = [...selectedLabels]
    if (selectedData.some((item) => item.text === label.text)) {
      const selectedIndex = selectedLabels?.findIndex(
        (selectedLabel) => selectedLabel.text === testLabels.labels[index].text
      )
      selectedIndex !== -1 && selectedData.splice(selectedIndex, 1)
      setSelectedLabels(selectedData)
    } else {
      selectedData.push(label)
      setSelectedLabels(selectedData)
    }
    console.log('selectedDataa:', selectedData)
  }
  console.log('selectedLabels:', selectedLabels)
  console.log('testLabels:', testLabels)

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
    if (selectedLabels.length !== defaultSelectedLabels.length) {
      return false
    }
    const diff1 = differenceBy(selectedLabels, defaultSelectedLabels) || []
    const diff2 = differenceBy(selectedLabels, defaultSelectedLabels) || []
    return diff1.length === 0 && diff2.length === 0
  }

  // const checkRemovedLabel = () => {
  //   console.log('defaultSelectedLabels 3333', defaultSelectedLabels)
  //   console.log('selectedLabels 3333', selectedLabels)
  //   console.log('selectedRow 3333', selectedRowKeys)
  //   const diffRemovedLabel = differenceBy(defaultSelectedLabels, selectedLabels)
  //   console.log('diffRemovedLabel 3333', diffRemovedLabel)
  //   // if (sourceData) {
  //   //   sourceData?.filter((item) => item.text === diffRemovedLabel.includes())
  //   // }
  //   // for(const x of sou)
  // }
  //
  // checkRemovedLabel()

  console.log('sourceData', sourceData)
  // if (selectedRowKeys && selectedRowKeys.length > 0) {
  //   const tempSelectedContacts = []
  //   for (const selContact of selectedRowKeys) {
  //     if (!tempSelectedContacts?.includes(selContact)) {
  //       selectedContacts.push(selContact)
  //     }
  //   }
  //   // console.log('tempSelectedContacts', tempSelectedContacts)
  // }

  // useEffect(() => {
  //   getLabelsQuery()
  //   console.log('getlabelsQueryyyyy')
  // }, [])

  //// DO NOT DELETE WORKINGGGG
  // const onApplyLabel = () => {
  //   handleApplyLabel(selectedLabels)
  //   setVisible(false)
  //   insertContactsLabelsMutaton({
  //     variables: {
  //       contact_id: selectedRowKeys[0],
  //       label_id: 104,
  //     },
  //   })
  // }

  //WORKING MULTIPLE CONTACTS
  // const onApplyLabel = () => {
  //   handleApplyLabel(selectedLabels)
  //   setVisible(false)
  //   if (selectedRowKeys && selectedRowKeys.length > 0) {
  //     for (const selectContact of selectedRowKeys) {
  //       insertContactsLabelsMutaton({
  //         variables: {
  //           contact_id: selectContact,
  //           label_id: 104,
  //         },
  //       })
  //     }
  //   }
  // }

  const {
    data: getContactsLabelsData,
    loading: geContactstLabelsLoading,
    error: getContactsLabelsError,
  } = useGetContactsLabelsQuery({ fetchPolicy: 'no-cache' })

  // WORKING MULTIPLE CONTACTS AND MULTIPLE LABELS
  // const onApplyLabel = () => {
  //   console.log('on 1111 apply label')
  //   handleApplyLabel(selectedLabels)
  //   console.log('selectedLabels 22222:', selectedLabels)
  //   setVisible(false)
  //   if (selectedRowKeys && selectedRowKeys.length > 0) {
  //     // getLabelsQuery()
  //     for (const selectContact of selectedRowKeys) {
  //       for (const selectedLabel of selectedLabels) {
  //         // console.log('selectedLabelll :', selectedLabel)
  //         // setTempSelectedContact(selectedLabel)
  //         // console.log('tempSelectedContact', tempSelectedContact)
  //         // await getLabelsQuery()
  //         // await getLabelsQuery()
  //         insertContactsLabelsMutaton({
  //           variables: {
  //             contact_id: selectContact,
  //             label_id: selectedLabel.id,
  //           },
  //         })
  //         getContactsLabelsQuery()
  //       }
  //     }
  //   }
  //   // setSelectedLabels([])
  // }

  const onApplyLabel = async () => {
    console.log('on 1111 apply label')
    handleApplyLabel(selectedLabels)
    console.log('selectedLabels 22222:', selectedLabels)
    setVisible(false)
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      // getLabelsQuery()
      for (const selectContact of selectedRowKeys) {
        for (const selectedLabel of selectedLabels) {
          console.log('selectedLabel ID 00000', selectedLabel.id)

          await insertContactsLabelsMutaton({
            variables: {
              contact_id: selectContact,
              label_id: selectedLabel.id,
            },
          })
          getContactsLabelsQuery()
        }
      }
    }
  }

  // for (const selectedLabel of selectedLabels) {
  //   console.log('selectedLabelll:', selectedLabel)
  // }

  // for(const selected)

  // console.log('newLabel :', newLabel)

  const content = () => {
    return (
      <div>
        <div className={styles.scrollerTag}>
          {/*{labels.map((label, index) => {*/}
          {/*  return (*/}
          {/*    <div key={index}>*/}
          {/*      {label?.label && (*/}
          {/*        <span*/}
          {/*          style={{ display: 'flex', flexDirection: 'row' }}*/}
          {/*          key={index}*/}
          {/*          onClick={() => handleSelect(label, index)}*/}
          {/*          className={styles.tagWrap}*/}
          {/*        >*/}
          {/*          <div className={styles.tagLayout}>*/}
          {/*            {label.color ? (*/}
          {/*              <TagFilled style={{ color: label.color }} />*/}
          {/*            ) : (*/}
          {/*              <TagOutlined />*/}
          {/*            )}*/}
          {/*            <div*/}
          {/*              className={styles.dropLayout}*/}
          {/*              style={{ backgroundColor: label.color }}*/}
          {/*              onClick={(e) => handleDropletClick(e, label, index)}*/}
          {/*            >*/}
          {/*              <CustomIcon name={'droplet'} />*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <div className={styles.tagName}>{label.label}</div>*/}
          {/*          {selectedLabels.some(*/}
          {/*            (item) => item.label === label.label*/}
          {/*          ) && <CheckOutlined />}*/}
          {/*        </span>*/}
          {/*      )}*/}
          {/*    </div>*/}
          {/*  )*/}
          {/*}*/}
          {testLabels?.labels.map((label, index) => {
            return (
              <div key={index}>
                {label?.text && (
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
                    <div className={styles.tagName}>{label.text}</div>
                    {selectedLabels.some(
                      (item) => (item.text || item.label) === label.text
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
                value={newLabel?.text}
                onChange={(e) =>
                  setNewLabel({
                    text: e.target.value,
                    color: selectedColor,
                    count: 0,
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
    <Popover
      visible={visible}
      content={content}
      title={t('clients.leftSidebar.addLabels')}
      trigger={'click'}
      placement={'bottom'}
      overlayClassName={styles.tagModal}
      onVisibleChange={handleVisible}
      overlay={children}
    >
      {children}
    </Popover>
  )
}

export default CreateLabels
