import React, { FC, useState, useEffect } from 'react'
import { useDebounce } from '@react-hook/debounce'
import { LoadingOutlined } from '@ant-design/icons'
import { SNOMED } from '@pabau/ui'
import _ from 'lodash'
import AutocompleteCustom from './AutoCompleteCustom'
import { Editor, EditorState, Modifier } from 'draft-js'
import { Spin } from 'antd'
import Highlighter from 'react-highlight-words'
import styles from './FormComponent.module.less'

interface P {
  title?: string
  placeHolder?: string
  required?: boolean
  onChangeTextValue?: (value: string) => void
}

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />
let g_searchTermArr: string[] = []

export const FormSnomed: FC<P> = ({
  title = '',
  placeHolder = '',
  required = false,
  onChangeTextValue,
}) => {
  const [terms, setTerms] = useState<SNOMED[]>([])
  const editor = React.useRef<Editor | null>(null)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [starting, setStarting] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce('', 500)
  const [searchTermArr, setSearchTermArr] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  g_searchTermArr = searchTermArr

  useEffect(() => {
    const snomedAPICall = async (debouncedSearchTerm) => {
      const startPos = debouncedSearchTerm.lastIndexOf('#')
      const termString = debouncedSearchTerm.slice(startPos + 1)
      const searchVal = termString.trim().replace(/\s\s+/g, '%20')
      setStarting(false)
      if (searchVal !== '') {
        setLoading(true)
        try {
          const response = await fetch(
            'https://termbrowser.nhs.uk/sct-browser-api/snomed/uk-edition/v20210901/descriptions?query=' +
              searchVal +
              '&limit=50&searchMode=partialMatching&lang=english&statusFilter=activeOnly&skipTo=0&returnLimit=200&normalize=true',
            {
              method: 'GET',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
            }
          )
          const data = await response.json()
          if (data?.matches.length > 0) {
            const tempItems = data?.matches.map((item, index) => ({
              id: index + '-' + item.conceptId,
              term: item.term,
              conceptId: item.conceptId,
              fsn: item.fsn,
            }))
            setTerms(tempItems)
            editor.current.blur()
            editor.current.focus()
          }
          setLoading(false)
        } catch {
          setLoading(false)
          setSearchTermArr([])
        }
      }
    }
    snomedAPICall(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onMatch = (text) => {
    let searchText = ''
    if (text.lastIndexOf('#') === -1) {
      searchText = text
    } else {
      const startPos = text.lastIndexOf('#')
      searchText = text.slice(startPos + 1)
    }
    const searchValArr = searchText.trim().split(' ')
    setSearchTermArr(searchValArr)
    return terms.filter(
      (snomed) =>
        snomed.term.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    )
  }

  const Hasthtag = ({ children }) => <span className="Hashtag">{children}</span>

  const List = ({ display, children }) => {
    return <ul className="snomedList">{children}</ul>
  }

  const onSelectSnomed = () => {
    setTerms([])
  }

  const Item = ({ item, current, onClick }) => {
    let classNames = 'snomedListItem'
    classNames += current ? ' current' : ''
    return (
      <li className={classNames} onMouseDown={onClick}>
        <div className={styles.snomedTitle}>
          <Highlighter
            highlightClassName={styles.snomedHighLight}
            searchWords={g_searchTermArr}
            autoEscape={true}
            textToHighlight={item.term}
          />
        </div>
        <div className={styles.snomedDescription}>
          <span className={styles.snomedFsn}>{item.fsn}</span>
          <span className={styles.snomedConceptId}>{item.conceptId}</span>
        </div>
      </li>
    )
  }

  const hashtag = {
    prefix: '#',
    type: 'HASHTAG',
    mutability: 'IMMUTABLE',
    onMatch: onMatch,
    component: Hasthtag,
    listComponent: List,
    itemComponent: Item,
    format: (item) => `${item.term}`,
  }

  const autocompletes = [hashtag]

  const onEditorStateChange = (e) => {
    const contentState = e.getCurrentContent()
    const inputText = contentState.getPlainText()
    if (inputText.lastIndexOf('#') === -1) {
      setStarting(false)
      setTerms([])
    }
    if (starting) setDebouncedSearchTerm(inputText)
    onChangeTextValue?.(inputText)
    setEditorState(e)
  }

  const onHandleBeforeInput = (chars, editorState, eventTimeStamp) => {
    if (chars === '#') {
      setStarting(true)
    }
  }

  return (
    <div className={`${styles.formTextField} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}

      <div className={styles.textFieldWithSnomed}>
        <AutocompleteCustom
          placeholder={placeHolder}
          editorState={editorState}
          onChange={onEditorStateChange}
          handleBeforeInput={onHandleBeforeInput}
          autocompletes={autocompletes}
          selectSnomed={onSelectSnomed}
        >
          <Editor ref={editor} />
        </AutocompleteCustom>
        {loading && (
          <div className={styles.snomedLoading}>
            <Spin indicator={antIcon} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FormSnomed
