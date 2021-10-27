/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styles from './CustomModal.module.less'
import { SecurityTools, SecurityToolsItemInfo, Notification, NotificationType, SimpleDropdown } from '@pabau/ui'
import BasicModal from '../modal/BasicModal'
import { useTranslation } from 'react-i18next'
import { Form } from 'formik-antd'
import { Formik } from 'formik'

export interface PasswordExpirationProps{
  modalType: Number
  password_expire: string
  login_attempts: string
  password_enforce_history: string
  lockout_period: string
}

interface P {
  datasource: SecurityToolsItemInfo[]
  newButtonText?: string
  dangerButtonText?: string
  onDelete?: () => void
  onOk?(val):void;
  loading?: boolean
  config?: PasswordExpirationProps
}

export function CustomModal(props: P) {
  const { t } = useTranslation('common')
  const { datasource = [], newButtonText, dangerButtonText, onDelete, onOk, config, loading } = props

  const defaultPasswordExpirationData= {
    modalType: 2,
    password_expire: config?.password_expire,
    login_attempts: config?.login_attempts,
    password_enforce_history: config?.password_enforce_history,
    lockout_period: config?.lockout_period
  }

  const [dataSource, setDataSource] = React.useState(datasource)
  const [selectedData, setSelectedData] = React.useState<any>(null)

  const [width, setWidth] = useState(window.innerWidth)
  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleOk=(data)=>{
    const List = [...dataSource]

    if(data.modalType === 1){
      if(data.isActive === true){
        List[0].isActive = false
      }else{
        List[0].isActive = true
      }
    }

    if(data.modalType === 3){
      if(data.isActive === true){
        List[2].isActive = false
      }else{
        List[2].isActive = true
      }
    }

    onOk?.(
      data.modalType === 1 ? List[0] :
      data.modalType === 3 ? List[2] : {}
      )
    setDataSource(List)
    setSelectedData(null)
  }

  useEffect(()=>{
    const List = [...dataSource]
    if(dataSource.length > 0){
      if(dataSource[0].modalType === 1){
        if(dataSource[0].isActive === true){
          List[0].isActive = true
        }else{
          List[0].isActive = false
        }
      }

      if(dataSource[2].modalType === 3){
        if(dataSource[2].isActive === true){
          List[2].isActive = true
        }else{
          List[2].isActive = false
        }
      }
    }

    setDataSource(List)
  },[datasource])

  return (
    <div>
      <SecurityTools
        datasource={dataSource}
        title={t('business.security.title')}
        onItemClick={(index) => {
          setSelectedData(dataSource[index])
        }}
        loading={loading}
      />

      {selectedData &&
        selectedData.modalType === 1 &&
        (width > 768 ? (
          <BasicModal
            title={selectedData ? selectedData.modalTitle : ''}
            visible={Boolean(selectedData)}
            onCancel={() => setSelectedData(null)}
            dangerButtonText={(dangerButtonText) ? dangerButtonText : "Cancel"}
            onDelete={() => setSelectedData(null)}
            newButtonText={dataSource[0].isActive === true ? "Disable" : "Enable"}
            centered={true}
            onOk={()=>{
              handleOk(selectedData)
            }}
          >
            {selectedData && (
              <div
                className={styles.modalGreyText}
                dangerouslySetInnerHTML={{ __html: selectedData.modalContent }}
              />
            )}
          </BasicModal>
        ) : (
          <BasicModal
            title={selectedData ? selectedData.modalTitle : ''}
            visible={Boolean(selectedData)}
            onCancel={() => setSelectedData(null)}
            onDelete={() => setSelectedData(null)}
            newButtonText={dataSource[0].isActive === true ? "Disable" : "Enable"}
            dangerButtonText="Cancel"
            onOk={()=>{
              handleOk(selectedData)
            }}
            closable={true}
            centered={true}
          >
            {selectedData && (
              <div
                className={styles.modalGreyText}
                dangerouslySetInnerHTML={{ __html: selectedData.modalContent }}
              />
            )}
          </BasicModal>
        ))}

      {selectedData &&
        selectedData.modalType === 2 &&
        (width > 768 ? (
          <Formik
          initialValues={defaultPasswordExpirationData}
          enableReinitialize={true}
          onSubmit={(values) => {
            onOk?.(values)
            setSelectedData(null)
          }}
        >
          {({ setFieldValue, values, handleSubmit }) => (
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
              >
                <BasicModal
                  title={selectedData ? selectedData.modalTitle : ''}
                  visible={Boolean(selectedData)}
                  onCancel={() => setSelectedData(null)}
                  newButtonText={selectedData.okbtn}
                  centered={true}
                  onOk={()=>{
                    handleSubmit()
                  }}
                >
                  {selectedData && (
                    <div className={styles.modalContainer}>
                      <div className={styles.leftpane}>
                      <SimpleDropdown
                        label={selectedData.modalMenu[0]}
                        dropdownItems={[selectedData.modalContent[0][0], selectedData.modalContent[0][1], selectedData.modalContent[0][2], selectedData.modalContent[0][3]]}
                        onSelected={(val) => setFieldValue('password_expire', val)}
                        value={values.password_expire}
                      />
                      <SimpleDropdown
                      label={selectedData.modalMenu[2]}
                        dropdownItems={[selectedData.modalContent[1][0], selectedData.modalContent[1][1], selectedData.modalContent[1][2]]}
                        onSelected={(val) => setFieldValue('login_attempts', val)}
                        value={values.login_attempts}
                      />
                      </div>
                      <div className={styles.rightpane}>
                        <SimpleDropdown
                        label={selectedData.modalMenu[1]}
                          dropdownItems={[selectedData.modalContent[2][0], selectedData.modalContent[2][1], selectedData.modalContent[2][2], selectedData.modalContent[2][3], selectedData.modalContent[2][4]]}
                          onSelected={(val) => setFieldValue('password_enforce_history', val)}
                          value={values.password_enforce_history}
                        />
                        <SimpleDropdown
                        label={selectedData.modalMenu[3]}
                          dropdownItems={[selectedData.modalContent[3][0], selectedData.modalContent[3][1], selectedData.modalContent[3][2]]}
                          onSelected={(val) => setFieldValue('lockout_period', val)}
                          value={values.lockout_period}
                        />
                      </div>
                    </div>
                  )}
                </BasicModal>
              </Form>
              )
            }
          </Formik>
        ) : (
          <Formik
          initialValues={defaultPasswordExpirationData}
          enableReinitialize={true}
          onSubmit={(values) => {
            onOk?.(values);
            setSelectedData(null)
          }}
        >
          {({ setFieldValue, values, handleSubmit }) => (
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
              >
          <BasicModal
            title={selectedData ? selectedData.modalTitle : ''}
            visible={Boolean(selectedData)}
            onCancel={() => setSelectedData(null)}
            newButtonText={selectedData.okbtn}
            dangerButtonText="Cancel"
            closable={false}
            centered={true}
            onOk={()=>{
              handleSubmit()
            }}
          >
            {selectedData && (
               <div className={styles.modalContainer}>
               <div className={styles.leftpane}>
               <SimpleDropdown
                        label={selectedData.modalMenu[0]}
                        dropdownItems={[selectedData.modalContent[0][0], selectedData.modalContent[0][1], selectedData.modalContent[0][2], selectedData.modalContent[0][3]]}
                        onSelected={(val) => setFieldValue('password_expire', val)}
                        value={values.password_expire}
                      />
                      <SimpleDropdown
                      label={selectedData.modalMenu[2]}
                        dropdownItems={[selectedData.modalContent[1][0], selectedData.modalContent[1][1], selectedData.modalContent[1][2]]}
                        onSelected={(val) => setFieldValue('login_attempts', val)}
                        value={values.login_attempts}
                      />
                      </div>
                      <div className={styles.rightpane}>
                        <SimpleDropdown
                        label={selectedData.modalMenu[1]}
                          dropdownItems={[selectedData.modalContent[2][0], selectedData.modalContent[2][1], selectedData.modalContent[2][2], selectedData.modalContent[2][3]]}
                          onSelected={(val) => setFieldValue('password_enforce_history', val)}
                          value={values.password_enforce_history}
                        />
                        <SimpleDropdown
                        label={selectedData.modalMenu[3]}
                          dropdownItems={[selectedData.modalContent[3][0], selectedData.modalContent[3][1], selectedData.modalContent[3][2]]}
                          onSelected={(val) => setFieldValue('lockout_period', val)}
                          value={values.lockout_period}
                        />
               </div>
             </div>
            )}
          </BasicModal>
           </Form>
           )
         }
       </Formik>
        ))}
      {selectedData &&
        selectedData.modalType === 3 &&
        (width > 768 ? (
          <BasicModal
            title={selectedData ? selectedData.modalTitle : ''}
            visible={Boolean(selectedData)}
            onCancel={() => setSelectedData(null)}
            newButtonText={dataSource[2].isActive === true ? "Disable" : "Enable"}
            onOk={()=>{
              handleOk(selectedData)
            }}
            centered={true}
          >
            {selectedData && (
              <div className={styles.modalGreyText}>
                {selectedData.modalContent}
              </div>
            )}
          </BasicModal>
        ) : (
          <BasicModal
            title={selectedData ? selectedData.modalTitle : ''}
            visible={Boolean(selectedData)}
            onCancel={() => setSelectedData(null)}
            newButtonText={dataSource[2].isActive === true ? "Disable" : "Enable"}
            onOk={()=>{
              handleOk(selectedData)
            }}
            dangerButtonText="Cancel"
            closable={false}
            centered={true}
          >
            {selectedData && (
              <div className={styles.modalGreyText}>
                {selectedData.modalContent}
              </div>
            )}
          </BasicModal>
        ))}

      {selectedData && selectedData.modalType === 4 && (
        <BasicModal
          title={selectedData ? selectedData.title : ''}
          visible={Boolean(selectedData)}
          onCancel={() => setSelectedData(null)}
          centered={true}
        >
          <div className={styles.modalGreyText}>
            {selectedData ? selectedData.name : ''}
          </div>
        </BasicModal>
      )}
    </div>
  )
}

export default CustomModal
