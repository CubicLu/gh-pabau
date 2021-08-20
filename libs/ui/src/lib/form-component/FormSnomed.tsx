import { Input, AutoComplete } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import styles from './FormComponent.module.less'
import { useDebounce } from '@react-hook/debounce'

const { TextArea } = Input

interface SNOMED {
  label: string
  value: string
}

interface P {
  title: string
  desc: string
  placeHolder: string
  defaultValue: string
  required: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormSnomed: FC<P> = ({
  title = '',
  desc = '',
  placeHolder = '',
  defaultValue = '',
  required = false,
  onChangeTextValue,
}) => {
  const [inputText, setInputText] = useState(defaultValue)
  const [termOptions, setTermOptions] = useState<SNOMED[]>([])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce('', 500)

  const onSelect = (value: string) => {
    const preInputText = inputText.split(' ').pop()
    if (value.indexOf('-') !== -1 && preInputText) {
      const newInputText =
        inputText.substring(0, inputText.length - preInputText?.length) +
        value.substring(value.indexOf('-') + 1)
      setInputText?.(newInputText)
      onChangeTextValue?.(newInputText)
    }
  }

  const onSearch = (value: string) => {
    setInputText?.(value)
    onChangeTextValue?.(value)
  }

  const renderLabel = (term: string, conceptId: string, fsn: string) => (
    <div className={styles.snomedItem} key={`${term}-${conceptId}-${fsn}`}>
      <div className={styles.snomedTitle}>{term}</div>
      <div className={styles.snomedDescription}>
        <span className={styles.snomedFsn}>{fsn}</span>
        <span className={styles.snomedConceptId}>{conceptId}</span>
      </div>
    </div>
  )

  useEffect(() => {
    const snomedAPICall = async (debouncedSearchTerm) => {
      setTermOptions([])
      const searchVal = debouncedSearchTerm.split(' ').pop()
      if (searchVal !== '') {
        try {
          const response = await fetch(
            'https://termbrowser.nhs.uk/sct-browser-api/snomed/uk-edition/v20210707/descriptions?query=' +
              searchVal +
              '&limit=50&searchMode=partialMatching&lang=english&statusFilter=activeOnly&skipTo=0&returnLimit=50&normalize=true',
            {
              method: 'GET',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
            }
          )
          const data = await response.json()
          if (data?.matches.length > 0) {
            const terms = data?.matches.map((item, index) => ({
              label: renderLabel(item.term, item.conceptId, item.fsn),
              value: index + '-' + item.term,
            }))
            setTermOptions(terms)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    snomedAPICall(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onTextChange = (e) => {
    setDebouncedSearchTerm(e.target.value)
  }

  return (
    <div className={`${styles.formTextArea} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentDescription}>{desc}</div>
      )}
      <div className={styles.formTextAreaValue}>
        <AutoComplete
          options={termOptions}
          dropdownClassName={styles.autocompleteWrap}
          style={{ width: '100%' }}
          onSelect={onSelect}
          onSearch={onSearch}
          value={inputText}
        >
          <TextArea
            placeholder={placeHolder}
            onChange={onTextChange}
            rows={2}
          />
        </AutoComplete>
      </div>
    </div>
  )
}

export default FormSnomed
