import React, { FC, useState } from 'react'
import Styles from './EmployeeSelector.module.less'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useOnlineBookableStaffQuery } from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

export interface P {
  onEmployeeSelected: (employeeID: number, staffID: number) => void
}

const EmployeeSelector: FC<P> = ({ onEmployeeSelected }) => {
  const [showmodal, setshowmodal] = useState(false)
  const { t } = useTranslationI18()

  const {
    loading: loadingStaff,
    error: errorStaff,
    data: staffResult,
  } = useOnlineBookableStaffQuery({
    variables: {
      shift_start: 20210206170000,
      company_id: 8021,
    },
  })

  if (errorStaff) return <div>Error!</div>
  if (loadingStaff) return <div>Loading...</div>

  return (
    <div className={Styles.mainBox}>
      <h4>{t('connect.onlinebooking.employes.title')}</h4>
      {staffResult.cmStaffGenerals.map((val) => (
        <div
          key={val.User.id}
          onClick={() => onEmployeeSelected(val.User.id, val.ID)}
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
                  <p className={Styles.userName}>{val.User.full_name}</p>
                  {val.description && (
                    <QuestionCircleOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                        setshowmodal(true)
                      }}
                    />
                  )}
                </div>
                <p>{val?.description}</p>
              </div>

              <p className={Styles.userCharge}>
                {val.charges ? `£${val.charges}` : ''}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default EmployeeSelector
