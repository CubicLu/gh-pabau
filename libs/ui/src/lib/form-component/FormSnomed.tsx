import React, { FC, useState, useEffect } from 'react'
import { Editor, EditorState, Modifier, CompositeDecorator } from 'draft-js'
import styles from './FormComponent.module.less'
import { useDebounce } from '@react-hook/debounce'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Tooltip } from 'antd'
import FormSnomedItem from './FormSnomedItem'
import { SNOMED } from '@pabau/ui'

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />

interface P {
  title: string
  placeHolder: string
  required: boolean
  onChangeTextValue?: (value: string) => void
}

export const FormSnomed: FC<P> = ({
  title = '',
  placeHolder = '',
  required = false,
  onChangeTextValue,
}) => {
  const editor = React.useRef<Editor | null>(null)
  function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'HASHTAG'
      )
    }, callback)
  }

  const Link = (props) => {
    const { term, fsn, conceptId } = props.contentState
      .getEntity(props.entityKey)
      .getData()
    return (
      <Tooltip title={`${fsn} - ${conceptId}`} color={'#108ee9'}>
        <span className={'Snomed'} data-offset-key={props.offsetKey}>
          {term}
        </span>
      </Tooltip>
    )
  }

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ])

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  )

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce('', 1000)
  const [terms, setTerms] = useState<SNOMED[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermArr, setSearchTermArr] = useState<string[]>([])
  const [inputedText, setInputedText] = useState('')
  const [suggestedSearchVal, setSuggestedSearchVal] = useState('')
  const [readOnly, setReadOnly] = useState(false)

  useEffect(() => {
    const snomedAPICall = async (debouncedSearchTerm) => {
      const searchValArr = debouncedSearchTerm.trim().split(' ')
      let searchVal = ''
      if (searchValArr.length === 1) {
        searchVal = searchValArr[0]
      } else if (searchValArr.length > 1) {
        searchVal =
          searchValArr[searchValArr.length - 2] +
          '%20' +
          searchValArr[searchValArr.length - 1]
      }

      setTerms([])
      setSuggestedSearchVal('')

      if (searchVal !== '') {
        setLoading(true)
        setReadOnly(true)
        try {
          const response = await fetch(
            'https://termbrowser.nhs.uk/sct-browser-api/snomed/uk-edition/v20210901/descriptions?query=' +
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
            setSearchTerm(searchVal)
            setSearchTermArr(searchValArr)
            const tempItems = data?.matches.map((item, index) => ({
              id: index + '-' + item.conceptId,
              term: item.term,
              conceptId: item.conceptId,
              fsn: item.fsn,
            }))
            setTerms(tempItems)
          }
          setLoading(false)
          setReadOnly(false)
          onFocusEditor()
        } catch (error) {
          setLoading(false)
          setReadOnly(false)
          onFocusEditor()
          console.log(error)
        }
      }
    }
    snomedAPICall(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const clearAllStatus = () => {
    setTerms([])
    setSuggestedSearchVal('')
    setReadOnly(false)
  }

  const onEditorStateChange = (e) => {
    const contentState = e.getCurrentContent()
    const inputText = contentState.getPlainText()
    if (inputText.length > inputedText.length && suggestedSearchVal !== '')
      setDebouncedSearchTerm(suggestedSearchVal)
    if (inputText.length === 0) clearAllStatus()
    setInputedText(inputText)
    onChangeTextValue?.(inputText)
    setEditorState(e)
  }

  const onEditorFocus = (e) => {
    clearAllStatus()
  }

  const onFocusEditor = () => {
    editor.current.focus()
  }

  const addEntityToEditorState = (item) => {
    // Create selection from range
    const currentSelectionState = editorState.getSelection()
    const end = currentSelectionState.getEndOffset()
    const start = end - searchTerm.length
    const selection = currentSelectionState.merge({
      anchorOffset: start,
      focusOffset: end,
    })

    // Create entity
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'HASHTAG',
      'IMMUTABLE',
      item
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    // Replace selection with the new create entity
    const newContentState = Modifier.replaceText(
      contentStateWithEntity,
      selection,
      item.term,
      null,
      entityKey
    )

    // Push new contentState with type
    let newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-autocomplete'
    )

    newEditorState = EditorState.forceSelection(
      newEditorState,
      newContentState.getSelectionAfter()
    )

    // Update cursor position after inserted content
    setEditorState(newEditorState)
  }

  const onClickItem = (term: SNOMED) => {
    addEntityToEditorState(term)
    clearAllStatus()
  }

  const onHandleBeforeInput = (chars, editorState, eventTimeStamp) => {
    const newSuggestedSearchVal = suggestedSearchVal + chars
    setSuggestedSearchVal(newSuggestedSearchVal)
  }

  return (
    <div className={`${styles.formSnomedArea} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      <div className={styles.formSnomedAreaValue}>
        <Editor
          editorState={editorState}
          onChange={onEditorStateChange}
          ref={editor}
          placeholder={placeHolder}
          onFocus={onEditorFocus}
          handleBeforeInput={onHandleBeforeInput}
          readOnly={readOnly}
        />
        {terms.length > 0 && (
          <ul className={styles.snomedList}>
            {terms.map((term, index) => (
              <FormSnomedItem
                term={term}
                searchTermArr={searchTermArr}
                key={term.id}
                onClickItem={onClickItem}
              />
            ))}
          </ul>
        )}
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
