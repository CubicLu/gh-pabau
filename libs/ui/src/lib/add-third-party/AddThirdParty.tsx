import {
  CheckCircleFilled,
  PlusCircleOutlined,
  SearchOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import {
  FullScreenReportModal as FullScreenModal,
  Input as PabauInput,
  OperationType,
  PhoneNumberInput,
  Relationship,
  RelationshipType,
  Button,
} from '@pabau/ui'
import useDebounce from '../../hooks/useDebounce'
import { Input as AntInput, Select as AntSelect } from 'antd'
import classNames from 'classnames'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import React, { FC, useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import activeThirdPartyCompany from '../../assets/images/active-company.svg'
import activeThirdPartyInsurance from '../../assets/images/active-insurance.svg'
import thirdPartyCompany from '../../assets/images/company.svg'
import thirdPartyInsurance from '../../assets/images/insurance.svg'
import { ReactComponent as MedicalCenter } from '../../assets/images/medical-center.svg'
import MapComponent from './Map'
import styles from './AddThirdParty.module.less'

const apiKey = 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw'
const { Option } = Select
const { Option: AntOption } = AntSelect

interface Coordinate {
  lat: number
  lng: number
}
interface SearchItem {
  name: string
  street: string
  postCode: string
  city: string
  country: string
  phone: string
  location?: Coordinate
}

export interface AddThirdPartyProps {
  visible: boolean
  thirdPartyType: RelationshipType
  onAddRelationship: (relationship: Relationship) => void
  onClose: () => void
  searchResults: SearchItem[]
}

export const AddThirdParty: FC<AddThirdPartyProps> = ({
  visible,
  thirdPartyType,
  onAddRelationship,
  onClose,
  searchResults,
}) => {
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState(-1)
  const [results, setResults] = useState<SearchItem[]>([])
  const [showThirdPartyModal, setShowThirdPartyModal] = useState(false)
  const [showPracticeModal, setShowPracticeModal] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const handleSearch = useCallback(
    async (search) => {
      setLoading(true)
      const searchItems: SearchItem[] = []
      const searchStr = search.replace(' ', '').toLowerCase()
      for (const item of searchResults.filter(
        (el) =>
          el.postCode.replace(' ', '').toLowerCase().includes(searchStr) ||
          el.name.replace(' ', '').toLowerCase().includes(searchStr)
      )) {
        await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${item.postCode.replace(
            /\s/g,
            '+'
          )}&key=${apiKey}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'OK') {
              const searchItem: SearchItem = {
                ...item,
                location: res.results[0].geometry.location,
              }
              searchItems.push(searchItem)
            }
          })
      }
      setResults(searchItems)
      setLoading(false)
    },
    [searchResults]
  )

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm)
    } else {
      setSelected(-1)
      setResults([])
    }
  }, [debouncedSearchTerm, handleSearch])

  const modalTitle =
    thirdPartyType === 'practioner'
      ? t('ui.add.thirdparty.modaltitle.practioner')
      : thirdPartyType === 'company'
      ? t('ui.add.thirdparty.modaltitle.company')
      : t('ui.add.thirdparty.modaltitle.insurance')

  const thirdPartyTitle =
    thirdPartyType === 'practioner'
      ? t('ui.add.thirdparty.title.practioner')
      : thirdPartyType === 'company'
      ? t('ui.add.thirdparty.title.company')
      : t('ui.add.thirdparty.title.insurance')

  const addManuallyText =
    thirdPartyType === 'practioner'
      ? t('ui.add.thirdparty.addmanual.practioner')
      : thirdPartyType === 'company'
      ? t('ui.add.thirdparty.addmanual.company')
      : t('ui.add.thirdparty.addmanual.insurance')

  const onSubmit = async (values, { resetForm }) => {
    resetForm()
    setShowPracticeModal(false)
    if (thirdPartyType !== 'practioner') {
      onAddRelationship({
        company: values.name,
        phone: values.phone,
        address: `${values.street} ${values.postCode} ${values.city} ${values.country}`,
        type: thirdPartyType,
      })
    } else {
      onAddRelationship({
        surgeryName: values.name,
        phone: values.phone,
        address: `${values.street} ${values.postCode} ${values.city} ${values.country}`,
        type: thirdPartyType,
      })
    }
  }

  const handleSetAsRelationship = (result: SearchItem) => {
    const { name, phone, street, postCode, city, country } = result
    if (thirdPartyType !== 'practioner') {
      onAddRelationship({
        company: name,
        phone: phone,
        address: `${street} ${postCode} ${city} ${country}`,
        type: thirdPartyType,
      })
    } else {
      onAddRelationship({
        surgeryName: name,
        phone: phone,
        address: `${street} ${postCode} ${city} ${country}`,
        type: thirdPartyType,
      })
    }
  }

  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const countryOptions = () => {
    const options = Object.keys(countriesName).map((c) => (
      <Option key={c} value={countriesName[c]}>
        {countriesName[c]}
      </Option>
    ))
    return options
  }

  const thirdPartiesSchema = Yup.object({
    name: Yup.string().required(t('setup.third.name.validate.required')),
  })

  const handleBackClick = (handleReset) => {
    handleReset()
    setShowThirdPartyModal(false)
    setShowPracticeModal(false)
  }

  const handleThirdPartyType = (type, setFieldValue) => {
    setFieldValue('type', type)
  }

  const initialCompanyValues = {
    type: 'company',
    name: '',
    providerNo: '',
    phone: '',
    email: '',
    website: '',
    country: '',
    city: '',
    street: '',
    postCode: '',
    healthCodeIdentifier: '',
  }

  const initialInsuranceProviderValues = {
    type: 'insurance-provider',
    name: '',
    providerNo: '',
    phone: '',
    email: '',
    website: '',
    country: '',
    city: '',
    street: '',
    postCode: '',
    healthCodeIdentifier: '',
  }

  const initialPracticeValues = {
    surgeryName: '',
    gpName: '',
    phone: '',
    street: '',
    postCode: '',
    city: '',
    country: '',
  }

  const handleClickAddManually = () => {
    if (thirdPartyType !== 'practioner') {
      setShowThirdPartyModal(true)
    } else {
      setShowPracticeModal(true)
    }
  }

  const addCompanyModalContent = (setFieldValue, values) => {
    return (
      <div className={styles.mainWrapper}>
        <Form layout="vertical">
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.type')}</h3>
            <div className={styles.thirdPartyType}>
              <div
                className={
                  values.type === 'company'
                    ? classNames(styles.typeWrapper, styles.active)
                    : styles.typeWrapper
                }
                onClick={() => handleThirdPartyType('company', setFieldValue)}
              >
                {values.type === 'company' ? (
                  <img src={activeThirdPartyCompany} alt="companyLogo" />
                ) : (
                  <img src={thirdPartyCompany} alt="companyLogo" />
                )}
                <span>{t('setup.third.form.type.company')}</span>
                <div className={styles.imgActive}>
                  <CheckCircleFilled />
                </div>
              </div>
              <div
                className={
                  values.type === 'insurance-provider'
                    ? classNames(styles.typeWrapper, styles.active)
                    : styles.typeWrapper
                }
                onClick={() =>
                  handleThirdPartyType('insurance-provider', setFieldValue)
                }
              >
                {values.type === 'insurance-provider' ? (
                  <img src={activeThirdPartyInsurance} alt="insuranceLogo" />
                ) : (
                  <img src={thirdPartyInsurance} alt="insuranceLogo" />
                )}
                <span>{t('setup.third.form.type.insurance')}</span>
                <div className={styles.imgActive}>
                  <CheckCircleFilled />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.general')}</h3>
            <div className={styles.customForm}>
              <Form.Item label={t('setup.third.form.general.name')} name="name">
                <Input
                  name="name"
                  placeholder={t('setup.third.form.general.name.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.general.provider')}
                name="providerNo"
              >
                <Input
                  name="providerNo"
                  placeholder={t(
                    'setup.third.form.general.provider.placeholder'
                  )}
                />
              </Form.Item>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.contact')}</h3>
            <div className={styles.customForm}>
              <Form.Item name="phone">
                <PhoneNumberInput
                  label={t('setup.third.form.contact.phone')}
                  value={values.phone}
                  onChange={(e) => setFieldValue('phone', e)}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.contact.email')}
                name="email"
              >
                <Input
                  name="email"
                  placeholder={t('setup.third.form.contact.email.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.contact.website')}
                name="website"
              >
                <Input
                  name="website"
                  placeholder={t(
                    'setup.third.form.contact.website.placeholder'
                  )}
                />
              </Form.Item>
              {values.type === 'Insurance' && (
                <Form.Item
                  label={t('setup.third.form.contact.healthcode')}
                  name="healthCodeIdentifier"
                  tooltip={t('setup.third.form.contact.healthcode.tooltip')}
                >
                  <Input
                    name="healthCodeIdentifier"
                    placeholder={t(
                      'setup.third.form.contact.healthcode.placeholder'
                    )}
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.address')}</h3>
            <div className={styles.customForm}>
              <Form.Item
                label={t('setup.third.form.address.country')}
                name="country"
              >
                <Select
                  name="country"
                  showSearch
                  placeholder={t(
                    'setup.third.form.address.country.placeholder'
                  )}
                  value={
                    values.country
                      ? values.country
                      : t('setup.third.form.address.country.placeholder')
                  }
                >
                  {countryOptions()}
                </Select>
              </Form.Item>
              <Form.Item label={t('setup.third.form.address.city')} name="city">
                <Input
                  name="city"
                  placeholder={t('setup.third.form.address.city.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.address.street')}
                name="street"
              >
                <Input
                  name="street"
                  placeholder={t('setup.third.form.address.street.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.address.postcode')}
                name="postCode"
              >
                <Input
                  name="postCode"
                  placeholder={t(
                    'setup.third.form.address.postcode.placeholder'
                  )}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }

  return (
    <>
      <FullScreenModal
        visible={visible}
        title={modalTitle}
        operations={[]}
        onBackClick={() => onClose()}
        footer={true}
      >
        <div className={styles.addThirdPartyContainer}>
          <div>
            <p className={styles.thirdPartyTitle}>{thirdPartyTitle}</p>
            <p className={styles.thirdPartyDescritpion}>
              {t('ui.add.thirdparty.description')}
            </p>
            <div className={styles.postcodeInputContainer}>
              <AntInput
                placeholder={t('ui.add.thirdparty.postcode.placeholder')}
                prefix={<SearchOutlined className={styles.searchIcon} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </div>
            {!searchTerm && (
              <div
                className={styles.addManuallyContainer}
                onClick={() => handleClickAddManually()}
              >
                <PlusCircleOutlined /> {addManuallyText}
              </div>
            )}
            {searchTerm && (
              <div className={styles.searchResults}>
                {loading && (
                  <div className={styles.loadingContainer}>
                    <LoadingOutlined />
                    <div className={styles.loadingText}>
                      {t('ui.add.thirdparty.search.loading')}
                    </div>
                  </div>
                )}
                {!loading && results.length > 0 && (
                  <p>{t('ui.add.thirdparty.search.guide')}</p>
                )}
                {!loading && results.length > 0 && (
                  <div className={styles.searchItems}>
                    {results.map((result, index) => (
                      <React.Fragment key={`search-item-${index}`}>
                        <div
                          className={
                            selected === index
                              ? classNames(styles.searchItem, styles.selected)
                              : styles.searchItem
                          }
                          onClick={() => setSelected(index)}
                        >
                          <div>
                            <MedicalCenter />
                          </div>
                          <div>
                            <div>{result.name}</div>
                            <div>{`${result.street} ${result.postCode} ${result.city} ${result.country}`}</div>
                            <div>{result.phone}</div>
                          </div>
                          <div className={styles.checked}>
                            <CheckCircleFilled />
                          </div>
                        </div>
                        {selected === index && (
                          <Button
                            type="primary"
                            className={styles.thirdPartySetButton}
                            onClick={() => handleSetAsRelationship(result)}
                          >
                            {thirdPartyType === 'practioner'
                              ? t('ui.add.thirdparty.set.button.practice')
                              : thirdPartyType === 'company'
                              ? t('ui.add.thirdparty.set.button.company')
                              : t('ui.add.thirdparty.set.button.insurance')}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <div className={styles.mapContainer}>
              <MapComponent searchItems={results} />
            </div>
          </div>
        </div>
      </FullScreenModal>
      <Formik
        enableReinitialize={true}
        initialValues={
          thirdPartyType === 'company'
            ? initialCompanyValues
            : initialInsuranceProviderValues
        }
        validationSchema={thirdPartiesSchema}
        onSubmit={(values, { resetForm }) => {
          const newValues = { ...values }
          onSubmit(newValues, { resetForm })
        }}
      >
        {({ setFieldValue, handleSubmit, handleReset, values }) => (
          <FullScreenModal
            title={t('ui.add.thirdparty.addmanual.title')}
            visible={showThirdPartyModal}
            operations={[OperationType.create]}
            enableCreateBtn={true}
            onBackClick={() => handleBackClick(handleReset)}
            onCreate={handleSubmit}
            createBtnText={t('common-label-save')}
            footer={true}
          >
            {addCompanyModalContent(setFieldValue, values)}
          </FullScreenModal>
        )}
      </Formik>
      <Formik
        enableReinitialize={true}
        initialValues={initialPracticeValues}
        validationSchema={''}
        onSubmit={(values, { resetForm }) => {
          const newValues = { ...values }
          onSubmit(newValues, { resetForm })
        }}
      >
        {({ setFieldValue, handleSubmit, handleReset, values }) => (
          <FullScreenModal
            title={t('ui.add.thirdparty.addmanual.title')}
            visible={showPracticeModal}
            operations={[OperationType.create]}
            enableCreateBtn={
              values.surgeryName !== '' &&
              values.gpName !== '' &&
              values.phone !== '' &&
              values.street !== '' &&
              values.postCode !== '' &&
              values.city !== '' &&
              values.country !== ''
            }
            onBackClick={() => handleBackClick(handleReset)}
            onCreate={handleSubmit}
            createBtnText={t('common-label-save')}
            footer={true}
          >
            <div className={styles.gpDetailsContent}>
              <div className={styles.gpDetailsSection}>
                <p className={styles.title}>General</p>
                <div className={styles.item}>
                  <PabauInput
                    label={t('ui.add.thirdparty.addmanual.surgery.label')}
                    placeHolderText={t(
                      'ui.add.thirdparty.addmanual.surgery.placeholder'
                    )}
                    text={values.surgeryName}
                    onChange={(val) => setFieldValue('surgeryName', val)}
                  />
                </div>
                <div className={styles.item}>
                  <PabauInput
                    label={t('ui.add.thirdparty.addmanual.gp.label')}
                    placeHolderText={t(
                      'ui.add.thirdparty.addmanual.gp.placeholder'
                    )}
                    text={values.gpName}
                    onChange={(val) => setFieldValue('gpName', val)}
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.phoneNumberWrapper}>
                    <PhoneNumberInput
                      label={t('ui.add.thirdparty.addmanual.phone.label')}
                      value={values.phone}
                      onChange={(val) => setFieldValue('phone', val)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.gpDetailsSection}>
                <p className={styles.title}>{t('ui.add.thirdparty.address')}</p>
                <div className={styles.item}>
                  <PabauInput
                    label={t('ui.add.thirdparty.address.street.label')}
                    text={values.street}
                    placeHolderText={t(
                      'ui.add.thirdparty.address.street.placeholder'
                    )}
                    onChange={(val) => setFieldValue('street', val)}
                  />
                </div>
                <div className={styles.items}>
                  <div className={styles.item}>
                    <PabauInput
                      label={t('ui.add.thirdparty.address.postcode.label')}
                      text={values.postCode}
                      placeHolderText={t(
                        'ui.add.thirdparty.address.postcode.placeholder'
                      )}
                      onChange={(val) => setFieldValue('postCode', val)}
                    />
                  </div>
                  <div className={styles.item}>
                    <PabauInput
                      label={t('ui.add.thirdparty.address.town.label')}
                      text={values.city}
                      placeHolderText={t(
                        'ui.add.thirdparty.address.town.placeholder'
                      )}
                      onChange={(val) => setFieldValue('city', val)}
                    />
                  </div>
                </div>
                <div className={styles.item}>
                  <p className={styles.label}>
                    {t('ui.add.thirdparty.address.country.label')}
                  </p>
                  <div className={styles.content}>
                    <AntSelect
                      defaultValue={values.country}
                      onSelect={(val) => setFieldValue('country', val)}
                    >
                      {Object.keys(countriesName).map((c) => (
                        <AntOption key={c} value={c}>
                          {countriesName[c]}
                        </AntOption>
                      ))}
                    </AntSelect>
                  </div>
                </div>
              </div>
            </div>
          </FullScreenModal>
        )}
      </Formik>
    </>
  )
}

export default AddThirdParty
