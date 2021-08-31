import React, { FC, useState, useEffect } from 'react'
import { Editor, EditorState, Modifier, CompositeDecorator } from 'draft-js'
import styles from './FormComponent.module.less'
import { useDebounce } from '@react-hook/debounce'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />

interface SNOMED {
  id: string
  term: string
  conceptId: string
  fsn: string
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
      <span
        title={`${fsn} - ${conceptId}`}
        className={'Snomed'}
        data-offset-key={props.offsetKey}
      >
        {term}
      </span>
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
  const [text, setText] = useState('')

  useEffect(() => {
    const snomedAPICall = async (debouncedSearchTerm) => {
      const searchVal = debouncedSearchTerm.split(' ').pop()
      console.log('searchVal =', searchVal)
      setTerms([])
      if (searchVal !== '') {
        setLoading(true)
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
            setSearchTerm(searchVal)
            const tempItems = data?.matches.map((item, index) => ({
              id: index + '-' + item.conceptId,
              term: item.term,
              conceptId: item.conceptId,
              fsn: item.fsn,
            }))
            setTerms(tempItems)
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.log(error)
        }
      }
    }
    snomedAPICall(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const onEditorStateChange = (e) => {
    const contentState = e.getCurrentContent()
    const inputText = contentState.getPlainText()
    console.log('inputText', inputText)
    console.log('text', text)
    if (inputText.length > text.length) setDebouncedSearchTerm(inputText)
    if (inputText.length === 0) setTerms([])
    setText(inputText)
    setEditorState(e)
  }

  const onEditorFocus = (e) => {
    setTerms([])
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
    setTerms([])
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
          onFocus={onEditorFocus}
        />
        {terms.length > 0 && (
          <ul className={styles.snomedList}>
            {terms.map((term, index) => (
              <div
                className={styles.snomedItem}
                key={term.id}
                onClick={(e) => onClickItem(term)}
              >
                <div className={styles.snomedTitle}>{term.term}</div>
                <div className={styles.snomedDescription}>
                  <span className={styles.snomedFsn}>{term.fsn}</span>
                  <span className={styles.snomedConceptId}>
                    {term.conceptId}
                  </span>
                </div>
              </div>
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
