import React, { FC, useState, useContext } from 'react'
import Styles from './EmployeeSelector.module.less'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useOnlineBookableStaffQuery } from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'
export interface P {
  onSelected: () => void
}

const EmployeeSelector: FC<P> = ({ onSelected }) => {
  const { t } = useTranslationI18()
  const [selectedData, setSelectedData] = useSelectedDataStore()
  const settings = useContext(SettingsContext)

  const {
    loading: loadingStaff,
    error: errorStaff,
    data: staffResult,
  } = useOnlineBookableStaffQuery({
    variables: {
      //shift_start: Number.parseInt(moment().format('YYYYMMDD000000')),
      company_id: settings.id,
    },
  })

  if (errorStaff) return <div>Error!</div>
  if (loadingStaff) return <div>Loading...</div>

  const calculateTotalServiceCost = (serviceUserTiers) => {
    let totalCost = 0
    for (const s of selectedData.services) {
      let servicePrice = s.price
      for (const ut of serviceUserTiers) {
        if (ut.service_id === s.id) {
          servicePrice = ut.price
        }
      }
      totalCost += servicePrice
    }
    return totalCost
  }

  return (
    <div className={Styles.mainBox}>
      <h4>{t('connect.onlinebooking.employes.title')}</h4>
      {staffResult.Public_Staff.map((val) => (
        <div
          key={val.Public_User.id}
          onClick={() => {
            setSelectedData('SET_EMPLOYEE', val)
            onSelected()
          }}
          className={Styles.oldBox}
        >
          <div className={Styles.contentBox}>
            <img
              src={'https://crm.pabau.com/' + val.Avatar}
              className={Styles.userImage}
            />
            <div className={Styles.userDetailWrapper}>
              <div className={Styles.userDetail}>
                <div className={Styles.userdetailInner}>
                  <p className={Styles.userName}>{val.Public_User.full_name}</p>
                  {false && <QuestionCircleOutlined />}
                </div>
                <p>&nbsp;</p>
              </div>

              <p className={Styles.userCharge}>
                {`£${calculateTotalServiceCost(
                  val.Public_User.Public_ServiceUserTier
                )}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default EmployeeSelector
