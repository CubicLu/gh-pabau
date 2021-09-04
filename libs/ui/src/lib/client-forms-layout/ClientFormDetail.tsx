import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import Signature from '../../assets/images/form-signature.svg'
import styles from './ClientFormsLayout.module.less'

interface FormDetailsProps {
  formData: FormDataProps
}

export interface FormDataProps {
  patient: string
  lastUpdate: string
  createdOn: string
  createdBy: string
  electronicOrderNo: string
  to: string
  requestingDoctor: string
  requestDate: string
  patientId: string
  requestId: string
  dob: string
  gender: string
  labsTests: string
  additionalTests: string
  fasting: string
  clinicalDetails: string
  dateSampleTaken: string
  timeSampleTaken: string
}
const FormDetails: FC<FormDetailsProps> = ({ formData }) => {
  const { t } = useTranslation('common')
  return (
    <div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.patient')}
        </span>
        <span className={styles.contentDetail}>{formData.patient}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.lastupdate')}
        </span>
        <span className={styles.contentDetail}>
          {dayjs(formData.lastUpdate).format('DD MMM YYYY')}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.createdon')}
        </span>
        <span className={styles.contentDetail}>
          {dayjs(formData.createdOn).format('DD MMM YYYY')}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.createdby')}
        </span>
        <span className={styles.contentDetail}>{formData.createdBy}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.electronicorderno')}
        </span>
        <span className={styles.contentDetail}>
          {formData.electronicOrderNo}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.to')}
        </span>
        <span className={styles.contentDetail}>{formData.to}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.requestingdoctor')}
        </span>
        <span className={styles.contentDetail}>
          {formData.requestingDoctor}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.requestdate')}
        </span>
        <span className={styles.contentDetail}>
          {dayjs(formData.requestDate).format('DD/MM/YYYY')}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.patient')}
        </span>
        <span className={styles.contentDetail}>{formData.patient}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.patientid')}
        </span>
        <span className={styles.contentDetail}>{formData.patientId}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.requestid')}
        </span>
        <span className={styles.contentDetail}>{formData.requestId}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.dob')}
        </span>
        <span className={styles.contentDetail}>
          {dayjs(formData.dob).format('DD/MM/YYYY')}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.gender')}
        </span>
        <span className={styles.contentDetail}>{formData.gender}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.labstests')}
        </span>
        <span className={styles.contentDetail}>{formData.labsTests}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.additionaltests')}
        </span>
        <span className={styles.contentDetail}>{formData.additionalTests}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.fasting')}
        </span>
        <span className={styles.contentDetail}>{formData.fasting}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.clinicaldetails')}
        </span>
        <span className={styles.contentDetail}>{formData.clinicalDetails}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.datesampletaken')}
        </span>
        <span className={styles.contentDetail}>{formData.dateSampleTaken}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.timesampletaken')}
        </span>
        <span className={styles.contentDetail}>{formData.timeSampleTaken}</span>
        <span className={styles.detailsBorder} />
      </div>

      <div className={styles.fullForm}>
        <span className={styles.contentFooterText}>
          {t('ui.clientcard.forms.footer.title')}
        </span>
        <span className={styles.contentFooterText}>
          {t('ui.clientcard.forms.footer.subtitle1')}
        </span>
        <span className={styles.contentFooterText}>
          {t('ui.clientcard.forms.footer.subtitle2')}
        </span>
        <span className={styles.contentFooterText}>
          {t('ui.clientcard.forms.clientsignature')}
        </span>
        <img src={Signature} className={styles.formCignature} alt="signature" />
      </div>
    </div>
  )
}

export default FormDetails
