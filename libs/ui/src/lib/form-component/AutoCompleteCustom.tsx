import React, { useState, useEffect } from 'react'

import {
  EditorState,
  CompositeDecorator,
  getDefaultKeyBinding,
  Modifier,
} from 'draft-js'

interface IMatch {
  text: string
  start: number
  end: number
}

const defaultMatch = {
  suggestions: null,
  listComponent: null,
  itemComponent: null,
  position: null,
}

interface iMatch {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  suggestions: any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  listComponent: any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  itemComponent: any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  position: any
}

const AutocompleteCustom = (props) => {
  const [focus, setFocus] = useState<boolean>(false)
  const [matches, setMatches] = useState({})
  const [match, setMatch] = useState<iMatch>(defaultMatch)
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)

  const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText()
    let matchArr
    const matches: IMatch[] = []
    while ((matchArr = regex.exec(text)) !== null) {
      const start = matchArr.index
      // We trim the match to remove last space
      // const length = matchArr[0].trim().length
      const length = matchArr[0].length
      // Call callback so draft do is job
      callback(start, start + length)
      // Add the match to the result
      matches.push({
        text: matchArr[2],
        start: start,
        end: start + length,
      })
    }

    return matches
  }

  const getSelectionPosition = () => {
    const selection = window.getSelection()

    if (selection?.rangeCount === 0) return null

    const parent = selection?.getRangeAt(0).startContainer.parentElement

    if (!parent) return null

    const boundingRect = parent.getBoundingClientRect()

    return {
      left: boundingRect.left,
      right: boundingRect.right,
      top: boundingRect.top,
      bottom: boundingRect.bottom,
    }
  }

  const isCurrentTextEmpty = (editorState) => {
    const selectionState = editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)
    const currentText = currentContentBlock.getText()
    return currentText.length === 0
  }

  const isCurrentSelectionAnEntity = (editorState) => {
    const selectionState = editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)
    const startOffset = selectionState.getStartOffset()
    const endOffset = selectionState.getEndOffset()
    const entityBefore = currentContentBlock.getEntityAt(startOffset - 1)
    const entityAfter = currentContentBlock.getEntityAt(endOffset)
    return entityBefore !== null || entityAfter !== null
  }

  const getMatch = (editorState, matches) => {
    const selectionState = editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()

    // No matches for this block no need to continue
    if (!matches[anchorKey]) return null
    const currentBlockMatches = matches[anchorKey]

    const startOffset = selectionState.getStartOffset()

    // For all matches in this block, we reduce all types
    // to get the first match, return null if no match found
    return Object.keys(currentBlockMatches).reduce((previous, type) => {
      // Only if no match found yet
      if (previous === null) {
        // Reduce all matches to get the first one that is in selection
        // return null if no match found
        return currentBlockMatches[type].reduce((previous, match) => {
          const inOffset =
            startOffset >= match.start && startOffset <= match.end
          return !inOffset
            ? previous
            : {
                ...match,
                type,
              }
        }, null)
      }

      return previous
    }, null)
  }

  const getAutocomplete = (autocompletes, match) => {
    return autocompletes.reduce((previous, autocomplete) => {
      return previous === null && autocomplete.type === match.type
        ? autocomplete
        : previous
    }, null)
  }

  const getSuggestions = async (autocomplete, match) => {
    if (typeof autocomplete.onMatch !== 'function') return []
    // Call onMatch method for found autocomplete
    try {
      return await autocomplete.onMatch(match.text)
    } catch {
      return []
    }
  }

  const addEntityToEditorState = (editorState, item, match) => {
    const { selectSnomed } = props
    // Range text to replace, the type and prefix
    const { start, end, type, mutability, format } = match

    // Create selection from range
    const currentSelectionState = editorState.getSelection()
    const selection = currentSelectionState.merge({
      anchorOffset: start,
      focusOffset: end,
    })

    // Create entity
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      type,
      mutability,
      item
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    // Replace selection with the new create entity
    const newContentState = Modifier.replaceText(
      contentStateWithEntity,
      selection,
      format(item),
      null,
      entityKey
    )

    // Push new contentState with type
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-autocomplete'
    )

    selectSnomed?.()

    // Update cursor position after inserted content
    return EditorState.forceSelection(
      newEditorState,
      newContentState.getSelectionAfter()
    )
  }

  useEffect(() => {
    const { editorState, onChange } = props
    const decorator = getDecorator()
    const newEditorState = EditorState.set(editorState, { decorator })
    onChange(newEditorState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateMatch = async () => {
    const { editorState, autocompletes } = props

    // Reset if text is empty
    if (isCurrentTextEmpty(editorState)) return resetMatch()

    // Reset if selection is an entity
    if (isCurrentSelectionAnEntity(editorState)) return resetMatch()

    // Reset if no match found
    const match = getMatch(editorState, matches)
    if (!match) return resetMatch()

    // Reset if no autocomplete config found for this match
    const autocomplete = getAutocomplete(autocompletes, match)
    if (!autocomplete) return resetMatch()
    // Get suggestions from autocomplete onMatch property
    const suggestions = await getSuggestions(autocomplete, match)

    // Update position only if focus
    let position = match?.position ? match?.position : null
    if (focus) {
      position = getSelectionPosition()
    }

    // New match is a merge of previous data
    const newMatch = {
      ...match,
      ...autocomplete,
      suggestions,
      position,
    }

    // Update selectedSuggestions if too high
    let newSelectedSuggestion = selectedSuggestion
    const lastSuggestionIndex =
      suggestions.length > 0 ? suggestions.length - 1 : 0
    if (selectedSuggestion > lastSuggestionIndex) {
      newSelectedSuggestion = lastSuggestionIndex
    }

    setMatch(newMatch)
    setSelectedSuggestion(newSelectedSuggestion)
  }

  useEffect(() => {
    updateMatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editorState])

  const getDecorator = () => {
    const { autocompletes, editorState } = props
    const existingDecorators = editorState.getDecorator()

    const strategies = autocompletes.reduce(
      (previous, autocomplete) => {
        const entityStrategy = {
          strategy: createEntityStrategy(autocomplete.type),
          component: autocomplete.component,
        }
        const autocompleteStrategy = {
          strategy: createAutocompleteStrategy(autocomplete),
          // eslint-disable-next-line react/display-name
          component: ({ children }) => <span>{children}</span>,
        }
        previous.push(entityStrategy, autocompleteStrategy)
        return previous
      },
      existingDecorators ? existingDecorators._decorators : []
    )

    return new CompositeDecorator(strategies)
  }

  const createEntityStrategy = (type) => {
    return (contentBlock, callback, contentState) => {
      // Set entity for existing ones
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity()
        if (entityKey === null) {
          return false
        }
        // Return true if type are matching
        return contentState.getEntity(entityKey).getType() === type
      }, callback)
    }
  }

  const createAutocompleteStrategy = (autocomplete) => {
    return (contentBlock, callback) => {
      const reg = new RegExp(
        String.raw({
          // raw: `(${autocomplete.prefix})(\\S*)(\\s|$)`, // eslint-disable-line no-useless-escape
          raw: `(${autocomplete.prefix})(.*)`, // eslint-disable-line no-useless-escape
        }),
        'g'
      )
      const result = findWithRegex(reg, contentBlock, callback)
      const newMatches = { ...matches }
      // Create autocompletes object if doesn't exists
      if (!newMatches[contentBlock.getKey()]) {
        newMatches[contentBlock.getKey()] = {}
      }
      // We override all matches for this block and this type
      newMatches[contentBlock.getKey()][autocomplete.type] = result
      // Update matches state
      setMatches(newMatches)
    }
  }

  const resetMatch = () => {
    setMatch(defaultMatch)
    setSelectedSuggestion(0)
  }

  const getChildren = () => {
    // Remove all props we use and pass this others to DraftJS default Editor component
    const { editorState, children, onChange, ...rest } = props

    const childrenProps = {
      ...rest,
      editorState,
      onChange,
      onFocus: onFocus,
      onBlur: onBlur,
      onDownArrow: onDownArrow,
      onUpArrow: onUpArrow,
      onEscape: onEscape,
      onTab: onTab,
      keyBindingFn: keyBindingFn,
      handleKeyCommand: handleKeyCommand,
    }

    return React.Children.map(children, (child) =>
      React.cloneElement(child, childrenProps)
    )
  }

  const buildSuggestionsList = () => {
    if (!match) return null

    const { suggestions, position } = match

    if (!suggestions || suggestions?.length === 0) return null

    const List = match?.listComponent
    const Item = match?.itemComponent

    const items = suggestions?.map((item, index) => {
      // Create onClick callback for each item so we can pass params
      const onClick = () => {
        onSuggestionClick(item, match)
      }
      // Is this item selected
      const selected = selectedSuggestion === index
      return (
        <Item key={index} item={item} current={selected} onClick={onClick} />
      )
    })

    return (
      <List display={focus} {...position}>
        {items}
      </List>
    )
  }

  const onSuggestionClick = (item, match) => {
    const { editorState, onChange } = props

    // Update editor state
    const newEditorState = addEntityToEditorState(editorState, item, match)
    onChange(newEditorState)
    // Update resetMatch suggestions
    setMatch(defaultMatch)
    setFocus(true)
  }

  /**
   * Add entity with item defined by selectedSuggestion
   */
  const addEntityWithSelectedSuggestion = () => {
    const { editorState, onChange } = props

    if (match?.suggestions[selectedSuggestion]) {
      const item = match?.suggestions[selectedSuggestion]
      const newEditorState = addEntityToEditorState(editorState, item, match)
      resetMatch()
      onChange(newEditorState)
    }
  }

  const onFocus = (e) => {
    setFocus(true)

    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const onBlur = (e) => {
    setFocus(false)

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const onDownArrow = (e) => {
    // Prevent default if match displayed
    if (focus && match) {
      const lastSuggestionIndex =
        match?.suggestions?.length > 0 ? match?.suggestions?.length - 1 : 0
      e.preventDefault()

      // Update selectedSuggestion index
      if (selectedSuggestion < lastSuggestionIndex) {
        setSelectedSuggestion(selectedSuggestion + 1)
      }
    }

    if (props.onDownArrow) {
      props.onDownArrow(e)
    }
  }

  const onUpArrow = (e) => {
    // Prevent default if match displayed
    if (focus && match) {
      e.preventDefault()

      // Update selectedSuggestion index
      if (selectedSuggestion > 0) {
        setSelectedSuggestion(selectedSuggestion - 1)
      }
    }

    if (props.onUpArrow) {
      props.onUpArrow(e)
    }
  }

  const onEscape = (e) => {
    // Prevent default if match displayed
    if (focus && match) {
      e.preventDefault()

      setMatch(defaultMatch)
      setSelectedSuggestion(0)
    }

    if (props.onEscape) {
      props.onEscape(e)
    }
  }

  const onTab = (e) => {
    // Prevent default if match displayed
    if (focus && match) {
      e.preventDefault()
      addEntityWithSelectedSuggestion()
    }

    if (props.onTab) {
      props.onTab(e)
    }
  }

  const keyBindingFn = (e) => {
    const { keyBindingFn } = props

    if (focus && match && e.keyCode === 13) {
      return 'add-entity'
    }

    return keyBindingFn ? keyBindingFn(e) : getDefaultKeyBinding(e)
  }

  const handleKeyCommand = (command) => {
    const { handleKeyCommand } = props

    if (command === 'add-entity') {
      addEntityWithSelectedSuggestion()
      return 'handled'
    }

    return handleKeyCommand ? handleKeyCommand(command) : 'not-handled'
  }

  const childrenWithProps = getChildren()
  const suggestions = buildSuggestionsList()

  return (
    <React.Fragment>
      {childrenWithProps}
      {suggestions}
    </React.Fragment>
  )
}

export default AutocompleteCustom
