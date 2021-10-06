import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './GpSearch.module.less'
import { Input } from 'antd'
import { ReactComponent as MedicalCenter } from '../../assets/images/medical-center.svg'
import {
  PlusCircleOutlined,
  SearchOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import AddPracticeModal from './AddPracticeModal'
import MapComponent from './Map'
import Button from '../button/Button'
import { useTranslation } from 'react-i18next'

interface Position {
  lng: number
  lat: number
}

export interface LocationDetails {
  apt?: string
  postcode?: string
  position: Position
  address: string
  city: string
  region: string
  country: string
  location: string
}
interface MapProps {
  apiKey: string
  locationDetail: LocationDetails
  isMarkerShown?: boolean
  setLocationDetail: ReactNode
}
interface SearchResultProps {
  place?: string
  address?: string
  phoneNumber?: string
}

const searchResultData = [
  {
    place: 'Deddington Health Centre',
    address: 'Earls Lane , Deddington, Banbury, Oxfordshire OX15 0TQ',
    phoneNumber: '+44 (0) 1869338611',
  },
  {
    place: 'DeddingtonLorem Health Centre',
    address: 'Earls Lane , Deddington, Banbury, Oxfordshire OX15 0TQ',
    phoneNumber: '+44 (0) 1869338611',
  },
]

export const GPSearch: FC<MapProps> = (props) => {
  const searchRef = useRef(null)
  const [visibleAddPracticeModal, setVisibleAddPracticeModal] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResultProps[]>([])
  const [addedManually, setAddedManually] = useState(false)
  const { t } = useTranslation('common')
  const toggleAddPracticeModal = () => {
    setVisibleAddPracticeModal(!visibleAddPracticeModal)
  }

  useEffect(() => {
    if (searchText) {
      setSearchResult(searchResultData)
      setAddedManually(false)
    }
  }, [searchText])

  const handleAddPracticeSubmit = (data) => {
    const formatResult = {
      place: data.surveyName,
      address: `${data.streetAddress} ${data.country} ${data.postCode}`,
    }
    setSearchResult([formatResult])
    setAddedManually(true)
  }

  return (
    <div className={styles.mainRow}>
      <div className={styles.firstCol}>
        <div className={styles.functionText}>
          <h4>{t('ui.gp-search.yourPractice')}</h4>
          <p>{t('ui.gp-search.yourPracticeMessage')}</p>
          <div>
            <div data-standalone-searchbox="">
              <div>
                <Input
                  prefix={<SearchOutlined />}
                  ref={searchRef}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  type="text"
                  placeholder={t('ui.gp-search.searchInput.placeholder')}
                  className={styles.searchInput}
                  allowClear={true}
                />
              </div>
            </div>
          </div>
          {!searchText && !addedManually && (
            <div className={styles.addIcon} onClick={toggleAddPracticeModal}>
              <PlusCircleOutlined />
              {t('ui.gp-search.searchInput.addPracticeManually')}
            </div>
          )}
          {(searchText || addedManually) && (
            <div className={styles.gpResults}>
              <h5>{t('ui.gp-search.searchInput.resultMessage')}</h5>
              {searchResult.map((result, i) => {
                return (
                  <div key={i} className={styles.searchResultWrap}>
                    <div className={styles.searchResult} key={i}>
                      <CheckCircleFilled />
                      <div className={styles.addressBox}>
                        <MedicalCenter />
                        <div className={styles.resultContent}>
                          <span>{result.place}</span>
                          <span>{result.address}</span>
                          <p>{result.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.btnPractice}>
                      <Button type={'primary'}>
                        {t('ui.gp-search.searchInput.setAsPracticeButton')}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <AddPracticeModal
            visible={visibleAddPracticeModal}
            onCancel={toggleAddPracticeModal}
            onSubmitPractice={handleAddPracticeSubmit}
          />
        </div>
      </div>
      <div className={styles.secondCol}>
        <MapComponent
          apiKey={props.apiKey}
          locationDetail={props.locationDetail}
          setLocationDetail={props.setLocationDetail}
        ></MapComponent>
      </div>
    </div>
  )
}

export default GPSearch
