import { SNOMED } from '@pabau/ui'
import React, { FC } from 'react'
import Highlighter from 'react-highlight-words'
import styles from './FormComponent.module.less'

interface P {
  term: SNOMED
  searchTermArr: string[]
  onClickItem: (term: SNOMED) => void
}

export const FormSnomedItem: FC<P> = ({ term, searchTermArr, onClickItem }) => {
  return (
    <div
      className={styles.snomedItem}
      key={term.id}
      onClick={(e) => onClickItem(term)}
    >
      <div className={styles.snomedTitle}>
        <Highlighter
          highlightClassName={styles.snomedHighLight}
          searchWords={searchTermArr}
          autoEscape={true}
          textToHighlight={term.term}
        />
      </div>
      <div className={styles.snomedDescription}>
        <span className={styles.snomedFsn}>{term.fsn}</span>
        <span className={styles.snomedConceptId}>{term.conceptId}</span>
      </div>
    </div>
  )
}

export default FormSnomedItem
