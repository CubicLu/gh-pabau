import React, { FC, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { MedicalFormCard, useLiveQuery } from '@pabau/ui'
import { Form, Divider, Button, Popover, Tag } from 'antd'
import { BarsOutlined, CheckOutlined } from '@ant-design/icons'
import styles from './Library.module.less'
import FormTypePicker, {
  Setting as FormTypeSetting,
} from '../FormTypePicker/FormTypePicker'

const defaultFormTypes: FormTypeSetting = {
  medicalHistory: false,
  consent: false,
  treatmentForm: false,
  epaper: false,
  presciption: false,
  labForm: false,
}

const LIST_QUERY = gql`
  query library_installers($limit: Int, $libLocation: String) {
    library_installers(
      limit: $limit
      where: { library_location: { _ilike: $libLocation } }
    ) {
      library_name
      library_image
      library_description
      library_location
      library_language
      is_plus
      data
      created_date
      id
    }
  }
`

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
  initialSetting?: FormTypeSetting
  initialTags?: TagItem[]
}

const Library: FC<LibraryProps> = ({ initialSetting, initialTags }) => {
  const [form] = Form.useForm()
  const [libItems, setLibItems] = useState([])
  const [setting, setSetting] = useState<FormTypeSetting>(defaultFormTypes)
  const [tags, setTags] = useState<TagItem[]>(defaultTags)
  const handleChangeSetting = (change: FormTypeSetting) => {
    setSetting(change)
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
          <FormTypePicker
            setting={setting}
            onChangeSetting={(change) => handleChangeSetting(change)}
          />
        </Form.Item>
      </Form>
    </div>
  )

  const getQueryVariables = () => {
    const queryOptions = {
      variables: {
        limit: 10,
        libLocation: 'medical',
      },
    }

    return queryOptions
  }

  const { data, loading } = useLiveQuery(LIST_QUERY, getQueryVariables())

  useEffect(() => {
    setSetting(initialSetting || defaultFormTypes)
    setTags(initialTags || defaultTags)
    if (!loading && data) {
      setLibItems(data)
    }
  }, [initialSetting, initialTags, data, loading])

  return (
    <div className={styles.libraryContainer}>
      <div>
        <div className={styles.formTypeContainer}>
          <Form form={form} layout="vertical">
            <Form.Item label="Form Type" tooltip="Form Type">
              <FormTypePicker
                setting={setting}
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
        <MedicalFormCard list={libItems} />
      </div>
    </div>
  )
}

export default Library
