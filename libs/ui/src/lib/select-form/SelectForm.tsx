import React, { FC, useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import { Button, Input } from 'antd'
import {
  FilterOutlined,
  StarOutlined,
  StarFilled,
  SearchOutlined,
} from '@ant-design/icons'
import { FormComponentBuilder, MyLottie as Lottie } from '@pabau/ui'
import emptyState from '../../assets/lottie/empty-state.json'
import useDebounce from '../../hooks/useDebounce'
import { useTranslation } from 'react-i18next'
import { sampleTreatmentFormList, sampleConsentFormList } from './mock'
import styles from './SelectForm.module.less'

interface FormItem {
  name: string
  previewData: string
  favorite: boolean
  selected?: boolean
}

export interface SelectFormComponentProps {
  formType: string
  formList: FormItem[]
  searchStr: string
  onSaveDraft?: (key, value) => void
}

const SelectFormComponent: FC<SelectFormComponentProps> = ({
  formType,
  formList,
  searchStr,
  onSaveDraft,
}) => {
  const { t } = useTranslation('common')
  const [formItems, setFormItems] = useState<FormItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [previewData, setPreviewData] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPreviewData('')
    onSaveDraft?.('searchStr', debouncedSearchTerm)
  }, [debouncedSearchTerm, onSaveDraft])

  const handleClickFavorite = (e, form) => {
    e.preventDefault()
    e.stopPropagation()
    const findIndex = formItems.findIndex((el) => el.name === form.name)
    if (findIndex >= 0) {
      const originItems = [...formList]
      const item = { ...form, favorite: !form.favorite }
      const items = [...formItems]
      items.splice(findIndex, 1, item)
      const orderedFavorites: FormItem[] = []
      const orderedNormal: FormItem[] = []
      for (const el of originItems) {
        const favorites = items.filter((element) => element.favorite)
        const findIndex = favorites.findIndex(
          (element) => element.name === el.name
        )
        if (findIndex >= 0) orderedFavorites.push({ ...favorites[findIndex] })
      }
      for (const el of originItems) {
        const normal = items.filter((element) => !element.favorite)
        const findIndex = normal.findIndex(
          (element) => element.name === el.name
        )
        if (findIndex >= 0) orderedNormal.push({ ...normal[findIndex] })
      }
      setFormItems([...orderedFavorites, ...orderedNormal])
      onSaveDraft?.('formList', [...orderedFavorites, ...orderedNormal])
    }
  }

  const getSelected = () => {
    const find = formItems.find((el) => el.selected)
    if (find) return find.previewData
    return ''
  }

  const handleSelectForm = (form: FormItem) => {
    const items = [...formItems]
    for (const item of items) {
      item.selected =
        item.name === form.name && item.selected === false ? true : false
    }
    setFormItems(items)
    onSaveDraft?.('formList', items)
  }

  const LottieContent = (
    <div className={styles.clientLayout} ref={ref}>
      <Lottie
        options={{
          loop: true,
          autoPlay: true,
          animationData: emptyState,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
      />
    </div>
  )

  useEffect(() => {
    setSearchTerm(searchStr)
  }, [searchStr])

  useEffect(() => {
    const items = formList
    setFormItems([
      ...items.filter((el) => el.favorite === true),
      ...items.filter((el) => el.favorite === false),
    ])
    onSaveDraft?.('formList', [
      ...items.filter((el) => el.favorite === true),
      ...items.filter((el) => el.favorite === false),
    ])
  }, [formList, onSaveDraft])

  return (
    <div className={styles.selectFormComponentContainer}>
      {formType === 'Treatment' ? (
        <div className={styles.selectTreatmentFormHeader}>
          <div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchTermInput}
              prefix={<SearchOutlined />}
              allowClear
            />
          </div>
          <div>
            <Button className={styles.manage}>
              {t('ui.selectform.manage')}
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.selectConsentFormHeader}>
          <div>
            <div className={styles.title}>
              {t('ui.selectform.formtypetitle', { formType })}
            </div>
            <div className={styles.filter}>
              <Button icon={<FilterOutlined />}>
                {t('ui.selectform.filter')}
              </Button>
            </div>
          </div>
          <div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchTermInput}
              prefix={<SearchOutlined />}
              allowClear
            />
            <Button className={styles.manage}>
              {t('ui.selectform.manage')}
            </Button>
          </div>
        </div>
      )}
      <div className={styles.selectFormBody}>
        <div>
          {/* form item list (tab) */}
          {formItems
            .filter((el) => {
              const nameStr = el.name.toLowerCase()
              const search = debouncedSearchTerm.toLowerCase()
              if (nameStr.includes(search) || search === '') return true
              return false
            })
            .map((form) => (
              <div
                key={`form-item-${form.name}`}
                className={
                  form.selected
                    ? cn(styles.formNameItem, styles.selected)
                    : styles.formNameItem
                }
                onClick={() => handleSelectForm(form)}
                onMouseOver={() => setPreviewData(form.previewData)}
                onMouseLeave={() => setPreviewData(getSelected())}
              >
                <span
                  className={styles.favoriteContainer}
                  onClick={(e) => handleClickFavorite(e, form)}
                >
                  {form.favorite ? (
                    <StarFilled className={styles.favoriteIcon} />
                  ) : (
                    <StarOutlined className={styles.normalIcon} />
                  )}
                </span>
                <div className={styles.formName}>{form.name}</div>
              </div>
            ))}
        </div>
        <div>
          {previewData ? (
            <FormComponentBuilder previewData={previewData} previewAttrs={[]} />
          ) : (
            LottieContent
          )}
        </div>
      </div>
    </div>
  )
}

interface DraftContent {
  receiverData: string
  formType?: string
  formList?: FormItem[]
  searchStr?: string
}

export interface SelectFormProps {
  client: {
    id: string
    email: string
    name: string
  }
  receiverData: string
  type: string
}

export const SelectForm: FC<SelectFormProps> = ({
  client,
  receiverData,
  type,
}) => {
  const [loaded, setLoaded] = useState(false)
  const [draftContent, setDraftContent] = useState<DraftContent[]>([])
  const [formType, setFormType] = useState('')
  const [searchStr, setSearchStr] = useState('')
  const [formList, setFormList] = useState<FormItem[]>([])

  useEffect(() => {
    if (!loaded) {
      const contentItems = JSON.parse(
        window.localStorage.getItem('pabau_content') || '[]'
      )
      const findItem = contentItems.find(
        (item) => item.receiverData === receiverData
      )
      if (findItem) {
        setFormList(findItem.formList)
        setSearchStr(findItem.searchStr)
        setFormType(type === 'treatment' ? 'Treatment' : 'Consent')
        setDraftContent(contentItems)
      } else {
        setFormList(
          type === 'treatment' ? sampleTreatmentFormList : sampleConsentFormList
        )
        setSearchStr('')
        setFormType(type === 'treatment' ? 'Treatment' : 'Consent')
        const item = {
          receiverData,
          searchStr: '',
          formList:
            type === 'treatment'
              ? sampleTreatmentFormList.map((el) => ({
                  ...el,
                  selected: false,
                }))
              : sampleConsentFormList.map((el) => ({ ...el, selected: false })),
        }
        const items = [...contentItems, item]
        setDraftContent(items)
        window.localStorage.setItem('pabau_content', JSON.stringify(items))
      }
      setLoaded(true)
    }
  }, [loaded, receiverData, type])

  const handleSaveDraft = async (key, value) => {
    const draftItems = [...draftContent]
    const findIndex = draftItems.findIndex(
      (el) => el.receiverData === receiverData
    )
    if (findIndex >= 0) {
      const item: DraftContent = draftItems[findIndex]
      item[key] = value
      draftItems.splice(findIndex, 1, item)
      await window.localStorage.setItem(
        'pabau_content',
        JSON.stringify(draftItems)
      )
    }
  }

  return (
    <div className={styles.selectFormContainer}>
      {loaded && (
        <SelectFormComponent
          formType={formType}
          searchStr={searchStr}
          formList={formList}
          onSaveDraft={(key, value) => handleSaveDraft(key, value)}
        />
      )}
    </div>
  )
}

export default SelectForm
