import React, { FC, useContext, useState } from 'react'
import Styles from './EmployeeSelector.module.less'
import { useOnlineBookableStaffQuery } from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'
import useServices from '../../hooks/useServices'
import { QuestionCircleOutlined } from '@ant-design/icons'
import EmployeeModal from './EmployeeModal'
import useStaffPermissions from '../../hooks/useStaffPermissions'
import DefaultAvatar from '../../assets/images/default-avatar.png'

export interface P {
  onSelected: () => void
}

const EmployeeSelector: FC<P> = ({ onSelected }) => {
  const { t } = useTranslationI18()
  const { setSelectedData, actionTypes } = useSelectedDataStore()
  const [getTotalServiceCost] = useServices()
  const [activeStaffModalID, setActiveStaffModalID] = useState(0)
  const settings = useContext(SettingsContext)
  const {
    canStaffPerformInLocation,
    canStaffPerformService,
  } = useStaffPermissions()

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

  if (staffResult.Public_Staff.length === 0) {
    return <div className={Styles.mainBox}>No staff available</div>
  }
  return (
    <div className={Styles.mainBox}>
      <h4>{t('connect.onlinebooking.employes.title')}</h4>
      <div
        key={0}
        onClick={() => {
          setSelectedData(actionTypes.SET_EMPLOYEE, null)
          onSelected()
        }}
        className={Styles.oldBox}
      >
        <div className={Styles.contentBox}>
          <img
            src={DefaultAvatar}
            className={Styles.userImage}
            alt={'Default Avatar'}
          />
          <div className={Styles.userDetailWrapper}>
            <div className={Styles.userDetail}>
              <div className={Styles.userdetailInner}>
                <p className={Styles.userName}>Choose anyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {staffResult.Public_Staff.map((val) => {
        if (
          !canStaffPerformInLocation(val) ||
          !canStaffPerformService(val.Public_User.id)
        )
          return false

        return (
          <div
            key={val.Public_User.id}
            onClick={() => {
              setSelectedData(actionTypes.SET_EMPLOYEE, val)
              onSelected()
            }}
            className={Styles.oldBox}
          >
            <div className={Styles.contentBox}>
              {val.Avatar !== '' && (
                <img
                  src={settings.pod_url + val.Avatar}
                  alt="User Avatar"
                  className={Styles.userImage}
                />
              )}
              <div className={Styles.userDetailWrapper}>
                <div className={Styles.userDetail}>
                  <div className={Styles.userdetailInner}>
                    <p className={Styles.userName}>
                      {val.Public_User.full_name}
                    </p>
                    {settings.BookitProGeneral.allow_rating && (
                      <QuestionCircleOutlined
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveStaffModalID(val.ID)
                          e.stopPropagation()
                        }}
                      />
                    )}
                  </div>
                  <p>{val.Position}</p>
                </div>

                <p className={Styles.userCharge}>
                  {`£${getTotalServiceCost(
                    val.Public_User.Public_ServiceUserTier
                  )}`}
                </p>
              </div>
              {activeStaffModalID === val.ID && (
                <EmployeeModal employeeData={val} estimatedCost={0} />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default EmployeeSelector
