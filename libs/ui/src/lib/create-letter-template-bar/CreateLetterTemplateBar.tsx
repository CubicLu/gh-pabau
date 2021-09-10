import {
  Button,
  FontIcon,
  FormTypeGroup,
  FormTypeGroupInfo,
  Input,
} from '@pabau/ui'
import { Input as InputL } from 'antd'
import React, { FC, useState } from 'react'
// import FileUploder from '../file-uploder/FileUploder'
import { ReactComponent as ScannedDocument } from '../../assets/images/form-type/scanned-document.svg'
import { ReactComponent as ScannedDocumentSelected } from '../../assets/images/form-type/scanned-document-selected.svg'
import { ReactComponent as LabResult } from '../../assets/images/form-type/lab-form.svg'
import { ReactComponent as LabResultSelected } from '../../assets/images/form-type/lab-form-selected.svg'

import styles from './CreateLetterTemplateBar.module.less'
import TagPanel, { TagItem } from '../tag-panel/TagPanel'
import { DeleteOutlined, FileWordOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const defaultFormTypeItems: FormTypeGroupInfo = {
  scanneddocument: {
    label: 'Scanned Document',
    selected: false,
    desc: 'A medical history form can be completed and updated multiple times, whilst retaining any previously completed information     ',
    icon: <ScannedDocument />,
    iconSelected: <ScannedDocumentSelected />,
  },
  labresult: {
    label: 'Lab Result',
    selected: false,
    desc: 'A treatment form is usually completed at the end of a pathway',
    icon: <LabResult />,
    iconSelected: <LabResultSelected />,
  },
}

interface InputTextProps {
  labelName?: string
  placeholder?: string
  onChange: (val: string) => void
}

export interface CreateLetterTemplateBarProps {
  title?: string
  _visible?: boolean
  inputTextProps?: InputTextProps
  tagItems?: TagItem[]
  _previewTitle?: string
  onDelete: () => void
}

export const CreateLetterTemplateBar: FC<CreateLetterTemplateBarProps> = ({
  title,
  _visible = false,
  inputTextProps,
  tagItems = [],
  _previewTitle = '',
  onDelete = () => console.log(),
}) => {
  const defaultTitle = 'Components'
  const [formTypeItems, setFormTypeItems] = useState(defaultFormTypeItems)
  const [visible, setVisible] = useState(_visible)
  const [selectedIcon, setSelectedIcon] = useState<IconName>('air-freshener')
  const [selectedIconLabel, setSelectedIconLabel] = useState('')
  const [isSelected, setIsSelected] = useState(false)

  const showModal = () => {
    setVisible(!visible)
  }

  const addTag = () => {
    if (setSelectedIconLabel.toString() !== '' && !isSelected) {
      const _temp = formTypeItems
      const _item = {
        label: selectedIconLabel,
        selected: true,
        desc: '',
        icon: <FontAwesomeIcon icon={selectedIcon} size="2x" />,
        iconSelected: <FontAwesomeIcon icon={selectedIcon} size="2x" />,
      }
      _temp[selectedIconLabel.replace(' ', '')] = _item
      showModal()
      setFormTypeItems(_temp)
      setSelectedIconLabel('')
      setIsSelected(true)
    }
    showModal()
  }
  return (
    <div className={styles.barContainer}>
      <div className={styles.title}>{title ?? defaultTitle}</div>
      <div className={styles.contentContainer}>
        <p>{inputTextProps ? inputTextProps.labelName : 'name'}</p>
        <Input
          placeholder={inputTextProps ? inputTextProps.placeholder : ''}
          onChange={(val: string) =>
            inputTextProps ? inputTextProps.onChange(val) : null
          }
        />
        <FormTypeGroup
          _formTypeItems={formTypeItems}
          editable={true}
          title={'What type of letter is this?'}
          isSelected={(val) => {
            setIsSelected(val)
          }}
        />
        <div className={styles.typeTitle}>
          <span onClick={() => showModal()}>{'+ Add Tag'}</span>
        </div>
        <Modal
          visible={visible}
          title={'Add a tag'}
          onCancel={() => showModal()}
          onOk={() => showModal()}
          footer={[]}
          className={styles.addForm}
        >
          <span className={styles.tagLabel}>{'Label'}</span>
          <InputL
            className={styles.nameInput}
            placeholder="Tag Label"
            value={selectedIconLabel}
            onChange={(e) => setSelectedIconLabel(e.target.value)}
          />
          {/* <Input
            className={styles.searchInput}
            placeholder="Search"
            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          /> */}
          <div>
            <FontIcon
              max={60}
              height={172}
              // selectedIcon={values.icon}
              onIconSelected={(icon) => {
                console.log('icon', icon)
                setSelectedIcon(icon)
              }}
            />
          </div>
          <Button onClick={() => addTag()}>{'Add'}</Button>
        </Modal>
        {/* <FileUploder acceptFileType={'.docx'} /> */}
        {_previewTitle && _previewTitle !== '' && (
          <div className={styles.dragdrop}>
            <div>
              <div className={styles.fileWrap}>
                <div className={styles.fileName}>
                  <FileWordOutlined />
                  &nbsp;&nbsp;&nbsp;
                  {_previewTitle}
                </div>
                <Button
                  size="large"
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete()}
                />
              </div>
            </div>
          </div>
        )}
        <TagPanel _tagItems={tagItems} />
      </div>
    </div>
  )
}

export default CreateLetterTemplateBar
