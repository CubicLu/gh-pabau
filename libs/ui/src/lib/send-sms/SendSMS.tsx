import { DiffOutlined, SendOutlined, TagsOutlined } from '@ant-design/icons'
import {
  Button,
  ChooseSMSTemplate,
  InputWithTags,
  RenderHtml,
  smsTemplateProps,
} from '@pabau/ui'
import cn from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { tagList } from '../merge-tag-modal/data'
import { defaultTemplateList } from './mock'
import styles from './SendSMS.module.less'

const HANDLE_REGEX = /\[.+?]/g

export interface SMSItem {
  date: string
  content: string
  direction: string
}

export interface SendSMSComponentProps {
  draft?: string
  sendBtnText?: string
  onSend: (val) => void
  onSaveDraft?: (draft: string) => void
  items: SMSItem[]
  templateList?: smsTemplateProps[]
}

const SendSMSComponent: FC<SendSMSComponentProps> = ({
  draft,
  sendBtnText,
  onSend,
  onSaveDraft,
  items,
  templateList,
}) => {
  const [openChooseTemplate, setOpenChooseTemplate] = useState(false)
  const [triggerTagDlg, setTriggerTagDlg] = useState(false)
  const [triggerEmpty, setTriggerEmpty] = useState(false)
  const [triggerChangeValue, setTriggerChangeValue] = useState(false)
  const [text, setText] = useState('')
  const [textWithTag, setTextWithTag] = useState('')
  const [count, setCount] = useState(0)
  const handleSend = () => {
    if (text.replace(/\n/g, '').length > 0) {
      setText('')
      setCount(0)
      onSend({ content: text, date: new Date(), direction: 'to' })
      setTriggerEmpty(true)
    }
  }

  useEffect(() => {
    setText(draft ?? '')
  }, [draft])

  useEffect(() => {
    if (text.replace(/\n/g, '').length > 0) {
      onSaveDraft?.(text)
    }
  }, [text, onSaveDraft])

  const onSmsWithTagChange = (e) => {
    setText(e)
    setCount(e.length)
    setTriggerChangeValue(false)
  }

  const clearTriggerTagDlg = () => {
    setTriggerTagDlg(false)
  }

  const clearTriggerEmpty = () => {
    setTriggerEmpty(false)
  }

  const findTagInfo = (tag) => {
    const findTag = Object.entries(tagList)
      .map(([key, value], index) => {
        const _index = value.items.findIndex((item) => item.tag === tag)
        if (_index !== -1) {
          return value.items[_index]
        }
        return false
      })
      .filter((item) => item)
    return findTag.length > 0 ? findTag[0] : false
  }

  const findAndReplaceTag = (orgString) => {
    let matchArr
    let replaceTagInfos = {}

    while ((matchArr = HANDLE_REGEX.exec(orgString)) !== null) {
      const tagInfo = findTagInfo(matchArr[0])
      let repalceTag = {}
      repalceTag = tagInfo
        ? {
            [tagInfo.tag]:
              '<button type="button" class="ant-btn ant-btn-primary ant-btn-sm"><-> ' +
              tagInfo.name +
              ' (' +
              tagInfo.module +
              ') ' +
              '</button>',
          }
        : {
            [matchArr[0]]:
              '<button type="button" class="ant-btn ant-btn-danger ant-btn-sm" title="This tag does not exist or will not work with this type of form">' +
              matchArr[0].substring(1, matchArr[0].length - 1) +
              '</button>',
          }
      replaceTagInfos = { ...replaceTagInfos, ...repalceTag }
    }

    if (!_.isEmpty(replaceTagInfos)) {
      const re = new RegExp(
        '\\' + Object.keys(replaceTagInfos).join('|\\'),
        'gi'
      )
      orgString = orgString.replace(re, function (matched) {
        return replaceTagInfos[matched]
      })
    }
    return orgString
  }

  return (
    <>
      <div className={styles.sendSMSComponentContainer}>
        <div className={styles.content}>
          <div className={styles.smsItems}>
            {items?.map((item, index) => (
              <div className={styles.smsItem} key={`sms-item-${index}`}>
                <div className={styles.date}>
                  {moment(item.date).format('DD/MM/YYYY hh:mm')}
                </div>
                <div
                  className={cn(
                    styles.smsItemContent,
                    item.direction === 'from'
                      ? styles.directionFrom
                      : styles.directionTo
                  )}
                >
                  <RenderHtml __html={findAndReplaceTag(item.content)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ops}>
          <div className={styles.smsInputContent}>
            <div className={styles.smsInputContentHeader}>
              <div>
                <div className={styles.operations}>
                  <div
                    className={styles.operation}
                    onClick={() => setTriggerTagDlg((e) => !e)}
                  >
                    <TagsOutlined />
                  </div>
                  <div
                    className={styles.operation}
                    onClick={() => setOpenChooseTemplate(true)}
                  >
                    <DiffOutlined />
                  </div>
                </div>
                <div className={styles.maxLengthText}>{`${count}/160`}</div>
              </div>
            </div>
            <div className={styles.smsInputContentBody}>
              <InputWithTags
                placeholder={''}
                onChange={onSmsWithTagChange}
                value={''}
                valueWithTag={textWithTag}
                disabledTags={[]}
                showTagButton={false}
                triggerTagDlg={triggerTagDlg}
                triggerEmpty={triggerEmpty}
                triggerChangeValue={triggerChangeValue}
                clearTriggerTagDlg={clearTriggerTagDlg}
                clearTriggerEmpty={clearTriggerEmpty}
                handleSend={handleSend}
                maxLength={160}
                maxWidth={364}
                maxHeight={66}
              />
            </div>
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSend()}
          >
            {sendBtnText || 'Send'}
          </Button>
        </div>
      </div>
      <ChooseSMSTemplate
        modalVisible={openChooseTemplate}
        templateList={templateList}
        onSelectTemplate={(template) => {
          setText(template)
          setTextWithTag(template)
          setTriggerChangeValue(true)
          setOpenChooseTemplate(false)
        }}
        onChooseSmsTemplate={(template) => {
          setText(template.message)
          setTextWithTag(template.message)
          setTriggerChangeValue(true)
          setOpenChooseTemplate(false)
        }}
        onSearchTextChange={(searchText) => {
          return
        }}
      />
    </>
  )
}

export interface SendSMSProps {
  clientId: string
  id: string
}

interface DraftContent {
  id: string
  draft: string
  items?: SMSItem[]
}

export const SendSMS: FC<SendSMSProps> = ({ clientId, id }) => {
  const [templateList, setTemplateList] = useState<smsTemplateProps[]>([])
  const [SMSItems, setSMSItems] = useState<SMSItem[]>([])
  const [contentItems, setContentItems] = useState<DraftContent[]>([])
  const [draft, setDraft] = useState('')

  const handleSendItem = (item) => {
    const items = [...SMSItems, item]
    setSMSItems(items)
    const content = [...contentItems]
    const findIndex = contentItems.findIndex((el) => el.id === id)
    if (findIndex >= 0) content.splice(findIndex, 1, { id, items, draft: '' })
    setContentItems(content)
    window.localStorage.setItem('pabau_content', JSON.stringify(content))
  }

  const handleSaveDraft = (draft) => {
    const content = [...contentItems]
    const findIndex = contentItems.findIndex((el) => el.id === id)
    content[findIndex].draft = draft
    setDraft(draft)
    window.localStorage.setItem('pabau_content', JSON.stringify(content))
  }

  useEffect(() => {
    setTemplateList(defaultTemplateList)
    const items = window.localStorage.getItem('pabau_content')
      ? JSON.parse(window.localStorage.getItem('pabau_content') || '{}')
      : []
    setContentItems(items)
    const findItem = items.find((item) => item.id === id)
    if (findItem) {
      setSMSItems(findItem.items)
      setDraft(findItem.draft)
    } else {
      setContentItems([...items, { id, items: [], draft: '' }])
      setSMSItems([])
      setDraft('')
    }
  }, [id])

  return (
    <div className={styles.sendSMSContainer}>
      <SendSMSComponent
        draft={draft}
        items={SMSItems}
        templateList={templateList}
        onSend={handleSendItem}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}

export default SendSMS
