import {
  BarsOutlined,
  CheckOutlined,
  FilePdfOutlined,
  MailOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { FormTypeGroup, FormTypeGroupInfo, MedicalFormCard } from '@pabau/ui'
import { Button, Divider, Form, Popover, Tag } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { ReactComponent as LetterOutlinedSelected } from '../../../assets/images/form-type/letter-selected.svg'
import { ReactComponent as LetterOutlined } from '../../../assets/images/form-type/letter.svg'
import styles from './Library.module.less'

interface Setting {
  medicalHistory: boolean
  consent: boolean
  treatment: boolean
  epaper: boolean
  prescription: boolean
  lab: boolean
}

const formTypeItems: FormTypeGroupInfo = {
  email: {
    label: 'Email',
    selected: false,
    desc:
      'A medical history form can be completed and updated multiple times, whilst retaining any previously completed information     ',
    icon: <MailOutlined />,
    iconSelected: <MailOutlined />,
  },
  sms: {
    label: 'SMS',
    selected: false,
    desc: 'A treatment form is usually completed at the end of a pathway',
    icon: <MessageOutlined />,
    iconSelected: <MessageOutlined />,
  },
  letter: {
    label: 'Letter',
    selected: false,
    desc: 'A treatment form is usually completed at the end of a pathway',
    icon: <LetterOutlined />,
    iconSelected: <LetterOutlinedSelected />,
  },
}

const defaultCardData = [
  {
    image: <FilePdfOutlined />,
    title: 'GP Letter',
    description:
      'Helping your client find their perfect wedding day look is a lot of fun and also a big responsibility.',
    form_type: 'consent',
    tags: [],
    key: 1,
  },
  {
    image: <FilePdfOutlined />,
    title: '',
    description:
      'A detailed medical history is important when creating a treatment plan with a patient.',
    form_type: 'consent',
    tags: [
      {
        title: 'Aesthetics',
        key: 1,
      },
    ],
    key: 2,
  },
  {
    image: <FilePdfOutlined />,
    title: 'Appointment Confirmation',
    description:
      'With all the options for skincare treatments and products it’s vital to complete a thrpugh...',
    form_type: 'consent',
    tags: [
      {
        title: 'Covid',
        key: 1,
      },
    ],
    key: 3,
  },
  {
    image: <FilePdfOutlined />,
    title: '',
    description:
      'It’s important to be really transparent with your client about why you collect their...',
    form_type: 'consent',
    tags: [
      {
        title: 'Laser',
        key: 1,
      },
    ],
    key: 4,
  },
]

const defaultTags: TagItem[] = [
  {
    name: 'Aesthetics',
    checked: false,
  },
  {
    name: 'Covid',
    checked: false,
  },
  {
    name: 'Laser',
    checked: false,
  },
  {
    name: 'Physio',
    checked: false,
  },
]

interface TagItem {
  name: string
  checked: boolean
}

interface LibraryProps {
  initialSetting?: Setting
  initialTags?: TagItem[]
}

const Library: FC<LibraryProps> = ({ initialSetting, initialTags }) => {
  const [form] = Form.useForm()
  const [tags, setTags] = useState<TagItem[]>(defaultTags)

  const handleChangeSetting = (change: FormTypeGroupInfo) => {
    console.log(change)
  }

  const handleTagClick = (index: number) => {
    const tagItems: TagItem[] = [...tags]
    tagItems[index].checked = !tagItems[index].checked
    setTags([...tagItems])
  }

  const MobileSetting = () => (
    <div className={styles.mobileSettingContainer}>
      <Form form={form} layout="vertical">
        <Form.Item label="Form Type" tooltip="Form Type">
          {/* <FormType
            setting={setting}
            onChangeSetting={(change) => handleChangeSetting(change)}
          /> */}
        </Form.Item>
      </Form>
    </div>
  )

  useEffect(() => {
    // setSetting(initialSetting || defaultFormTypes)
    setTags(initialTags || defaultTags)
  }, [initialSetting, initialTags])

  return (
    <div className={styles.libraryContainer}>
      <div>
        <div className={styles.formTypeContainer}>
          <Form form={form} layout="vertical">
            <Form.Item label="Message type" tooltip="Message type">
              <FormTypeGroup
                title={'Message Type'}
                titleVisible={false}
                editable={true}
                alerted={true}
                multiable={true}
                _formTypeItems={formTypeItems}
                onChangeSetting={(change) => handleChangeSetting(change)}
              />
            </Form.Item>
          </Form>
        </div>
        <Divider style={{ margin: 0 }} />
        <div className={styles.tagsContainer}>
          <Form form={form} layout="vertical">
            <Form.Item label="Tags">
              {tags?.map((tag, index) => (
                <div
                  key={tag.name}
                  className={
                    tag.checked ? styles.tagChecked : styles.tagUnchecked
                  }
                >
                  <Tag
                    onClick={() => handleTagClick(index)}
                    icon={tag.checked ? <CheckOutlined /> : ''}
                  >
                    {tag.name}
                  </Tag>
                </div>
              ))}
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <Popover
          content={MobileSetting}
          trigger="hover"
          placement="bottomRight"
        >
          <div className={styles.mobileSetting}>
            <Button shape="circle" icon={<BarsOutlined />} />
          </div>
        </Popover>
        <MedicalFormCard list={defaultCardData} />
      </div>
    </div>
  )
}

export default Library
