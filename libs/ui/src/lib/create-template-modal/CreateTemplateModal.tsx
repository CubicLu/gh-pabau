import { Button, Layout, Modal } from 'antd'

import React, { FC, useState } from 'react'

import {
  CalendarOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  FileTextFilled,
  LeftOutlined,
  MoreOutlined,
  TeamOutlined,
} from '@ant-design/icons'

import CommunicationTemplatePreview from '../communication-template-preview/CommunicationTemplatePreview'
import CreateTemplateBar from '../create-template-bar/CreateTemplateBar'

import styles from './CreateTemplateModal.module.less'
import {
  ChooseModalItem,
  CommunicationLetterPreview,
  CreateLetterTemplateBar,
  TagItem,
} from '@pabau/ui'
import { ReactComponent as MarketingOutlinedIcon } from '../../assets/images/form-type/marketing.svg'

export const MarketingOutlined = MarketingOutlinedIcon
const { Sider, Content } = Layout

export const chooseModalEmailItems: ChooseModalItem[] = [
  {
    title: 'General',
    description: 'Services booked by one client in a single visit',
    icon: <CalendarOutlined />,
  },
  {
    title: 'Confirmations',
    icon: <FileDoneOutlined />,
    description: 'Use Pabau’s online video conferencing',
  },
  {
    title: 'Leads',
    icon: <TeamOutlined />,
    description: 'Sell multiple services as a packaged bundle',
  },
  {
    title: 'Marketing',
    icon: <MarketingOutlined />,
    description: 'Sell multiple services as a packaged bundle',
  },
]

export const chooseModalSMSItems: ChooseModalItem[] = [
  {
    title: 'General',
    description: 'Services booked by one client in a single visit',
    icon: <CalendarOutlined />,
  },
  {
    title: 'Confirmations',
    icon: <FileDoneOutlined />,
    description: 'Use Pabau’s online video conferencing',
  },
  {
    title: 'Leads',
    icon: <TeamOutlined />,
    description: 'Sell multiple services as a packaged bundle',
  },
  {
    title: 'Marketing',
    icon: <MarketingOutlined />,
    description: 'Sell multiple services as a packaged bundle',
  },
]

export interface CreateTemplateModalProps {
  templateType?: string
  title?: string
  visible?: boolean
  icon?: React.Component
  onClosed?: () => void
  workingLabel?: string
  workingLabelVisible?: boolean
  buttonLabel?: string
  buttonClick?: () => void
  selectedService?: string
}

export const CreateTemplateModal: FC<CreateTemplateModalProps> = ({
  templateType,
  title,
  visible,
  icon,
  workingLabel,
  workingLabelVisible = false,
  buttonLabel,
  buttonClick,
  onClosed,
  selectedService = undefined,
}) => {
  const [previewSMS, setPreviewSMS] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [tags, setTags] = useState<TagItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const makeTagItems = (tags) => {
    const arr: TagItem[] = []
    for (const [i, tag] of tags.entries()) {
      const _tag = {
        name: 'success',
        label: tag,
        icon: <CheckCircleOutlined key={i} />,
        color: 'success',
        enable: true,
      }
      arr.push(_tag)
    }
    return arr
  }

  const onChange = (file, tags) => {
    // setFile(file)
    setPreviewTitle(file.name)
    const _tag = makeTagItems(tags)
    setTags(_tag)
    setLoaded(true)
  }

  const onDelete = () => {
    setPreviewTitle('')
    setTags([])
    setLoaded(false)
  }

  return (
    <Modal
      visible={visible ?? false}
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={styles.fullScreenModal}
    >
      <>
        <div className={styles.fullScreenModalHeader}>
          <div>
            {icon ?? (
              <LeftOutlined
                onClick={() => (onClosed ? onClosed() : null)}
                style={{
                  color: 'var(--light-grey-color)',
                  marginRight: '24px',
                  fontSize: '24px',
                }}
              />
            )}
            <FileTextFilled
              style={{
                color: '#54B2D3',
                marginRight: '24px',
                fontSize: '24px',
              }}
            />
            {title ?? 'Create SMS Template'}
            {workingLabelVisible ? (
              <span>{workingLabel ?? 'Saving...'}</span>
            ) : null}
          </div>
          <div className={styles.fullScreenModalOps}>
            <Button
              onClick={() => buttonClick?.()}
              className={styles.button}
              style={{ marginRight: '1rem' }}
              type="primary"
            >
              {buttonLabel ?? 'Save'}
            </Button>
            <MoreOutlined style={{ fontSize: '21px', fontWeight: 'bold' }} />
          </div>
        </div>
        <div className={styles.fullScreenModalBody}>
          <Layout>
            <Sider style={{ background: 'white', width: '336px !important' }}>
              {templateType === 'email' && (
                <CreateTemplateBar
                  title={
                    'This notification automatically sends to clients ahead of their upcoming appointment.'
                  }
                  inputTextProps={{
                    labelName: 'Name',
                    placeholder: '',
                    onChange: (val: string) => console.log(val),
                  }}
                  linkProps={{
                    labelName: 'Learn More',
                    href: '/#',
                    onClick: () => console.log(),
                  }}
                  inputAreaProps={{
                    labelName: 'Message',
                    placeholder: 'e.g. Special Offer',
                    onChange: ({ target: { value } }) => console.log(),
                  }}
                  chooseTypeGroupProps={{
                    items: chooseModalEmailItems,
                    onSelected: () => {
                      console.log()
                    },
                  }}
                  selectedService={selectedService}
                />
              )}
              {templateType === 'sms' && (
                <CreateTemplateBar
                  title={
                    'This notification automatically sends to clients ahead of their upcoming appointment.'
                  }
                  inputTextProps={{
                    labelName: 'Name',
                    placeholder: '',
                    onChange: (val: string) => console.log(val),
                  }}
                  linkProps={{
                    labelName: 'Learn More',
                    href: '#',
                    onClick: () => console.log(),
                  }}
                  inputAreaProps={{
                    labelName: 'Message',
                    placeholder: 'e.g. Special Offer',
                    onChange: (e) => setPreviewSMS(e.target.value),
                  }}
                  chooseTypeGroupProps={{
                    items: chooseModalSMSItems,
                    onSelected: () => {
                      console.log()
                    },
                  }}
                  selectedService={selectedService}
                />
              )}
              {templateType === 'letter' && (
                <CreateLetterTemplateBar
                  tagItems={tags}
                  _previewTitle={previewTitle}
                  onDelete={() => onDelete()}
                />
              )}
            </Sider>
            <Layout>
              <Content>
                {(templateType === 'sms' || templateType === 'email') && (
                  <CommunicationTemplatePreview sms={previewSMS} />
                )}
                {templateType === 'letter' && (
                  <CommunicationLetterPreview
                    title={previewTitle}
                    onChange={(file, tags) => onChange(file, tags)}
                    loaded={loaded}
                  />
                )}
              </Content>
            </Layout>
          </Layout>
        </div>
      </>
    </Modal>
  )
}

export default CreateTemplateModal
