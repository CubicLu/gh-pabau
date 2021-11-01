import React, { FC } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { Avatar, Button } from '@pabau/ui'
import styles from '../../pages/clients/clients.module.less'
import noDuplicateData from '../../assets/images/no-dupliacte-data.png'

interface MergeComponentProps {
  duplicateData?: any[] //TODO: use the type from @pabau/graphql, once you've written the query
  onDismiss?: (val) => void
  onMerge?: (val) => void
  onMergeAll?: (val) => void
  duplicateContactsData?: any
}

export const MergeComponent: FC<MergeComponentProps> = ({
  duplicateData,
  onDismiss,
  onMerge,
  onMergeAll,
  duplicateContactsData,
}) => {
  const { t } = useTranslationI18()

  return (
    <div className={styles.mergeFixWrapper}>
      {duplicateContactsData?.duplicateContacts?.length === 0 ? (
        <div className={styles.noDuplicateCard}>
          <img src={noDuplicateData} alt={'No Data'} />
          <span>{t('clients.mergeFix.button.merge.empty')}</span>
        </div>
      ) : (
        <>
          <h5>{t('clients.mergeFix.title')}</h5>
          <Button type={'primary'} onClick={() => onMergeAll(duplicateData)}>
            {t('clients.mergeFix.button.mergeAll')}
            {duplicateContactsData?.duplicateContacts?.length > 0 &&
              ` (${duplicateContactsData?.duplicateContacts?.length})`}
          </Button>
          <div className={styles.mergeContacts}>
            {duplicateContactsData?.duplicateContacts?.map(
              (data, dataIndex) => {
                return (
                  <div className={styles.userDataWrap} key={dataIndex}>
                    <div className={styles.userContent}>
                      {data.map((item, index) => {
                        const { Fname = '', Lname = '' } = item
                        return (
                          <div className={styles.userInfo} key={index}>
                            <div className={styles.avtarIcon}>
                              <Avatar name={Fname}></Avatar>
                            </div>
                            <div className={styles.mergeData}>
                              <h6>{`${Fname} ${Lname}`}</h6>
                              <span>{item?.Email}</span>
                              <span>{item?.Mobile}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className={styles.mergeFooterBtn}>
                      <Button onClick={() => onDismiss(data)}>
                        {t('clients.mergeFix.button.dismiss')}
                      </Button>
                      <Button onClick={() => onMerge(data)} type={'primary'}>
                        {t('clients.mergeFix.button.merge')}
                      </Button>
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default MergeComponent
