import React, { FC, useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import {
  SignatureDlg,
  ProposeTime,
  RequestPayment,
  ChooseEmailTemplate,
  emailTemplateProps,
} from '@pabau/ui'
import {
  CaretDownFilled,
  FileAddOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { templateList } from './mock'
import { ReactComponent as SignatureOutlined } from '../../assets/images/signature.svg'
import styles from './SendMailOps.module.less'

export interface SendMailOpsProps {
  message: string
  onChangeSignature: (signature: string) => void
  onProposeTimeSelected: (time: string) => void
  onChooseTemplate: (template: string) => void
}

export const SendMailOps: FC<SendMailOpsProps> = ({
  message,
  onChangeSignature,
  onProposeTimeSelected,
  onChooseTemplate,
}) => {
  const opsRef = useRef<HTMLDivElement>(null)
  const proposeTimesRef = useRef<HTMLDivElement>(null)
  const requestPaymentsRef = useRef<HTMLDivElement>(null)
  const templatesRef = useRef<HTMLDivElement>(null)
  const signatureRef = useRef<HTMLDivElement>(null)
  const [scrollAllow, setScrollAllow] = useState(false)
  const [showSignDlg, setShowSignDlg] = useState(false)
  const [showChooseTemplate, setShowChooseTemplate] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectTemplate, setSelectTemplate] = useState('All Templates')
  const [
    chooseEmailTemplate,
    setChooseEmailTemplate,
  ] = useState<emailTemplateProps>()

  const handleChooseTemplate = (template: emailTemplateProps) => {
    setChooseEmailTemplate(template)
    onChooseTemplate(
      `<p>Hi!</p><p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>`
    )
    setShowChooseTemplate(false)
  }

  useEffect(() => {
    if (
      !!opsRef &&
      opsRef.current &&
      !!proposeTimesRef &&
      proposeTimesRef.current &&
      !!requestPaymentsRef &&
      requestPaymentsRef.current &&
      !!templatesRef &&
      templatesRef.current &&
      !!signatureRef &&
      signatureRef.current
    ) {
      const opsTotalWidth =
        proposeTimesRef.current.offsetWidth +
        requestPaymentsRef.current.offsetWidth +
        templatesRef.current.offsetWidth +
        signatureRef.current.offsetWidth +
        60
      if (opsRef.current.offsetWidth < opsTotalWidth) {
        setScrollAllow(true)
      }
    }
  }, [opsRef, proposeTimesRef, requestPaymentsRef, templatesRef, signatureRef])

  const handleScrollLeft = () => {
    if (!!opsRef && opsRef.current) {
      opsRef.current.scrollLeft += 20
    }
  }

  const handleScrollRight = () => {
    if (!!opsRef && opsRef.current) {
      opsRef.current.scrollLeft -= 20
    }
  }

  return (
    <React.Fragment>
      <div
        className={
          scrollAllow
            ? cn(styles.sendMailOpsContainer, styles.scrollAllow)
            : styles.sendMailOpsContainer
        }
      >
        {scrollAllow && (
          <div className={styles.leftArror} onClick={() => handleScrollLeft()}>
            <LeftOutlined />
          </div>
        )}
        <div className={styles.operationGroup} ref={opsRef}>
          <div className={styles.proposeTimesContainer} ref={proposeTimesRef}>
            <ProposeTime onSelected={(value) => onProposeTimeSelected(value)} />
          </div>
          <div
            className={styles.requestionPaymentsContainer}
            ref={requestPaymentsRef}
          >
            <RequestPayment
              message={message}
              onSharePayLink={(payment) => {
                return
              }}
            />
          </div>
          <div
            className={styles.templatesContainer}
            ref={templatesRef}
            onClick={() => setShowChooseTemplate(true)}
          >
            <div>
              <FileAddOutlined />
            </div>
            <div>Templates</div>
            <div>
              <CaretDownFilled />
            </div>
          </div>
          <div
            className={styles.signatureContainer}
            ref={signatureRef}
            onClick={() => setShowSignDlg(true)}
          >
            <div>
              <SignatureOutlined />
            </div>
            <div>Signature</div>
          </div>
        </div>
        {scrollAllow && (
          <div
            className={styles.rightArror}
            onClick={() => handleScrollRight()}
          >
            <RightOutlined />
          </div>
        )}
      </div>
      <SignatureDlg
        visible={showSignDlg}
        defautlValue=""
        onClose={() => setShowSignDlg(false)}
        onChange={(value) => {
          onChangeSignature(value)
          setShowSignDlg(false)
        }}
      />
      {showChooseTemplate && (
        <ChooseEmailTemplate
          modalVisible={showChooseTemplate}
          searchText={searchText}
          onSearchTextChange={(e) => setSearchText(e.target.value)}
          selectTemplate={selectTemplate}
          onSelectTemplate={setSelectTemplate}
          templateList={templateList}
          onChooseEmailTemplate={handleChooseTemplate}
          chooseEmailTemplate={chooseEmailTemplate}
        />
      )}
    </React.Fragment>
  )
}

export default SendMailOps
