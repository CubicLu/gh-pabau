import React, { FC, useContext } from 'react'
import Styles from './EmployeeSelector.module.less'
//import { QuestionCircleOutlined } from '@ant-design/icons'
import { useOnlineBookableStaffQuery } from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useSelectedDataStore } from '../../store/selectedData'
import { SettingsContext } from '../../context/settings-context'
import useServices from '../../hooks/useServices'
export interface P {
  onSelected: () => void
}

const EmployeeSelector: FC<P> = ({ onSelected }) => {
  const { t } = useTranslationI18()
  const [, setSelectedData] = useSelectedDataStore()
  const [getTotalServiceCost] = useServices()
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
              alt="User Avatar"
              className={Styles.userImage}
            />
            <div className={Styles.userDetailWrapper}>
              <div className={Styles.userDetail}>
                <div className={Styles.userdetailInner}>
                  <p className={Styles.userName}>{val.Public_User.full_name}</p>
                  {/*{false && <QuestionCircleOutlined />}*/}
                </div>
                <p>&nbsp;</p>
              </div>

              <p className={Styles.userCharge}>
                {`£${getTotalServiceCost(
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
