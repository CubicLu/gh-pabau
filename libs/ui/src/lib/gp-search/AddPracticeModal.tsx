import React, { FC, useState } from 'react'
import { Button, BasicModal, Input } from '@pabau/ui'
import styles from './GpSearch.module.less'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SuccessModal from './SuccessModal'
import { useTranslation } from 'react-i18next'

export interface AddPracticeModalProps {
  onCancel?: () => void
  visible?: boolean
  onSubmitPractice?: (data) => void
}

export const AddPracticeModal: FC<AddPracticeModalProps> = ({
  onCancel,
  visible,
  onSubmitPractice,
}) => {
  const { t } = useTranslation('common')
  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
  const formik = useFormik({
    initialValues: {
      surveyName: '',
      streetAddress: '',
      postCode: '',
      country: '',
    },
    validationSchema: Yup.object({
      surveyName: Yup.string().required(
        t('ui.gp-search.addPracticeModal.validation.surveyName')
      ),
      streetAddress: Yup.string().required(
        t('ui.gp-search.addPracticeModal.validation.streetAddress')
      ),
      postCode: Yup.string().required(
        t('ui.gp-search.addPracticeModal.validation.postCode')
      ),
      country: Yup.string().required(
        t('ui.gp-search.addPracticeModal.validation.country')
      ),
    }),
    onSubmit: (values) => {
      if (onSubmitPractice) {
        onSubmitPractice(values)
        toggleSuccessModal()
      }
      if (onCancel) {
        handleCancel()
      }
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    formik.setValues({
      surveyName: '',
      streetAddress: '',
      postCode: '',
      country: '',
    })
  }

  const handleChange = (key, val) => {
    formik.setFieldValue(key, val)
  }

  const toggleSuccessModal = () => {
    setVisibleSuccessModal(!visibleSuccessModal)
  }

  return (
    <div className={styles.addPracticeModal2}>
      <BasicModal
        title={t('ui.gp-search.searchInput.addPracticeManually')}
        footer={false}
        onCancel={handleCancel}
        visible={visible}
        className={styles.addPracticeModal}
        width={544}
        destroyOnClose={true}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className={styles.addPracticeForm}>
              <Input
                label={t('ui.gp-search.addPrqacticeModal.gpServeyName')}
                text={formik.values.surveyName}
                onChange={(val) => handleChange('surveyName', val)}
              />
              <Input
                label="Street address"
                text={formik.values.streetAddress}
                onChange={(val) => handleChange('streetAddress', val)}
              />
              <Input
                label={t('ui.gp-search.addPrqacticeModal.Postcode')}
                text={formik.values.postCode}
                onChange={(val) => handleChange('postCode', val)}
              />
              <Input
                label={t('ui.gp-search.addPrqacticeModal.country')}
                text={formik.values.country}
                onChange={(val) => handleChange('country', val)}
              />
            </div>
            <div className={styles.addPracticeModalFooter}>
              <Button
                type={'default'}
                size="middle"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                {t('add-button-filter-cancel')}
              </Button>
              <Button
                type={'primary'}
                size="middle"
                htmlType={'submit'}
                disabled={Object.keys(formik.errors).length > 0}
              >
                {t('ui.gp-search.addPrqacticeModal.AddPracticeButton')}
              </Button>
            </div>
          </div>
        </form>
      </BasicModal>
      <SuccessModal
        visible={visibleSuccessModal}
        onCancel={toggleSuccessModal}
      />
    </div>
  )
}

export default AddPracticeModal
