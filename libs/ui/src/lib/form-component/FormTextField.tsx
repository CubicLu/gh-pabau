import { RenderHtml } from '@pabau/ui'
import _ from 'lodash'
import { DatePicker, Input, InputNumber } from 'antd'
import React, { FC, useState } from 'react'
import { tagList } from '../merge-tag-modal/data'
import styles from './FormComponent.module.less'

interface P {
  title?: string
  desc?: string
  placeHolder?: string
  defaultValue?: string
  txtInputType?: string
  required?: boolean
  onChangeTextValue?: (value: string) => void
}

const HANDLE_REGEX = /\[.+?]/g

export const FormTextField: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  txtInputType = '',
  required = false,
  onChangeTextValue,
}) => {
  const [text, setText] = useState(defaultValue)

  const onTextChange = (e) => {
    setText?.(e.target.value)
    onChangeTextValue?.(e.target.value)
  }

  const onNumberChange = (e) => {
    setText?.(e)
    onChangeTextValue?.(e)
  }

  function onDateChange(date, dateString) {
    onChangeTextValue?.(dateString)
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
              '<button type="button" class="ant-btn ant-btn-primary ant-btn-sm">&lt;-&gt; ' +
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
    <div className={`${styles.formTextField} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          <RenderHtml __html={findAndReplaceTag(title)} />
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}
      <div className={styles.textFieldValue}>
        {(txtInputType === '' ||
          txtInputType === 'email' ||
          txtInputType === 'text') && (
          <Input
            placeholder={placeHolder}
            onChange={onTextChange}
            value={text}
          />
        )}
        {txtInputType === 'number' && (
          <InputNumber
            placeholder={placeHolder}
            onChange={onNumberChange}
            value={Number(text)}
          />
        )}
        {txtInputType === 'date' && (
          <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
        )}
      </div>
    </div>
  )
}

export default FormTextField
