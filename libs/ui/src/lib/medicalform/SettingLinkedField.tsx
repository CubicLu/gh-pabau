import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, ButtonTypes, HelpTooltip } from '@pabau/ui'
import { Input, Select } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Setting.module.less'

const { Option, OptGroup } = Select

type linkedFieldProps = {
  linkedLabel?: string
  linkedFieldValue: string
  onChangeLinkedField: (value: string) => void
}

interface LinkedFieldItem {
  item_value: string
  item_label: string
}

interface LinkedFieldGroup {
  group_label: string
  group_items: LinkedFieldItem[]
}

const SettingLinkedField: FC<linkedFieldProps> = ({
  linkedLabel,
  linkedFieldValue,
  onChangeLinkedField,
}) => {
  const { t } = useTranslation('common')
  const linkedFields: LinkedFieldGroup[] = [
    {
      group_label: 'Basic Fields',
      group_items: [
        {
          item_value: 'FName',
          item_label: 'First Name',
        },
        {
          item_value: 'LName',
          item_label: 'Last Name',
        },
        {
          item_value: 'Email',
          item_label: 'Email',
        },
        {
          item_value: 'Phone',
          item_label: 'Phone',
        },
        {
          item_value: 'Mobile',
          item_label: 'Mobile',
        },
        {
          item_value: 'DOB',
          item_label: 'Date of Birth',
        },
        {
          item_value: 'MailingCountry',
          item_label: 'Country',
        },
        {
          item_value: 'MailingCity',
          item_label: 'City',
        },
        {
          item_value: 'MailingPostal',
          item_label: 'Postal',
        },
        {
          item_value: 'MailingProvince',
          item_label: 'Province',
        },
        {
          item_value: 'MailingStreet',
          item_label: 'Street',
        },
        {
          item_value: 'FullAddress',
          item_label: 'Full Address',
        },
        {
          item_value: 'Gender',
          item_label: 'Gender',
        },
      ],
    },
    {
      group_label: 'Insurance Fields',
      group_items: [
        {
          item_value: 'membership_number',
          item_label: 'Membership Number',
        },
        {
          item_value: 'auth_code',
          item_label: 'Authorisation Code',
        },
      ],
    },
    {
      group_label: 'Preferences',
      group_items: [
        {
          item_value: 'MarketingOptInEmail',
          item_label: 'Email Marketing',
        },
        {
          item_value: 'MarketingOptInText',
          item_label: 'SMS Marketing',
        },
        {
          item_value: 'MarketingOptInPhone',
          item_label: 'Phone',
        },
        {
          item_value: 'MarketingOptInPost',
          item_label: 'Letters',
        },
      ],
    },
    {
      group_label: 'Custom Fields',
      group_items: [
        {
          item_value: 'cs-24681',
          item_label: 'Best Time to Call',
        },
        {
          item_value: 'cs-189',
          item_label: 'BODY',
        },
        {
          item_value: 'cs-160',
          item_label: 'CAT',
        },
        {
          item_value: 'cs-24684',
          item_label: 'Enquiry Location',
        },
        {
          item_value: 'cs-24640',
          item_label: 'Enquiry Type',
        },
        {
          item_value: 'cs-163',
          item_label: 'FACE',
        },
        {
          item_value: 'cs-22856',
          item_label: 'GP Address Line 1',
        },
        {
          item_value: 'cs-22857',
          item_label: 'GP Address Line 2',
        },
        {
          item_value: 'cs-22858',
          item_label: 'GP Address Line 3',
        },
        {
          item_value: 'cs-22860',
          item_label: 'GP City',
        },
        {
          item_value: 'cs-22862',
          item_label: 'GP Country',
        },
        {
          item_value: 'cs-22861',
          item_label: 'GP County',
        },
        {
          item_value: 'cs-22854',
          item_label: 'GP Name',
        },
        {
          item_value: 'cs-22855',
          item_label: 'GP Surgery',
        },
        {
          item_value: 'cs-22859',
          item_label: 'GP Postal',
        },
        {
          item_value: 'cs-24639',
          item_label: 'Preferred Consultation Date',
        },
        {
          item_value: 'cs-186',
          item_label: 'SKIN',
        },
        {
          item_value: 'cs-3088',
          item_label: 'Treatment expectations',
        },
        {
          item_value: 'cs-2604',
          item_label: 'Treatment Interest',
        },
        {
          item_value: 'cs-24641',
          item_label: 'Treatment of Interest',
        },
        {
          item_value: 'cs-192',
          item_label: 'TREATMENTS',
        },
        {
          item_value: 'cs-24642',
          item_label: 'URL Referrer',
        },
      ],
    },
  ]
  const [addLinkedField, setAddLinkedField] = useState(false)

  const getLinkedFieldItem = (value) => {
    const linkedFieldItems: LinkedFieldItem[] = linkedFields.flatMap(
      (f) => f.group_items
    )
    const selectedItem = linkedFieldItems.filter(
      (item) => item.item_value === value
    )
    return selectedItem
  }

  const getLinkedFileName = (value) => {
    const selectedItem = getLinkedFieldItem(value)
    let linkedFieldName = ''
    if (selectedItem.length > 0) {
      linkedFieldName = selectedItem[0].item_label
    }
    return linkedFieldName
  }

  const handleChange = (e) => {
    const selectedItem = getLinkedFieldItem(e)
    if (selectedItem.length > 0) {
      onChangeLinkedField(selectedItem[0].item_value)
    }
  }

  const handleDelete = () => {
    setAddLinkedField(false)
    onChangeLinkedField('')
  }

  return (
    <>
      <p style={{ marginTop: '20px' }}>
        {linkedLabel}{' '}
        <HelpTooltip
          helpText={t('ui.medicalform.setting.linkedfield.tooltip')}
        />
      </p>
      {getLinkedFileName(linkedFieldValue) !== '' ? (
        <div className={styles.linkedField}>
          <Input
            className={styles.optionInput}
            placeholder={t('ui.medicalform.setting.linkedfield.input.tooltip')}
            readOnly={true}
            value={getLinkedFileName(linkedFieldValue)}
          />

          <Button
            className={styles.optionBtn}
            size="small"
            type={ButtonTypes.default}
            onClick={handleDelete}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ) : (
        <div>
          {addLinkedField && (
            <>
              <Select
                size="large"
                style={{ width: '100%', marginTop: '10px' }}
                onChange={(e) => handleChange(e)}
              >
                <Option value="">Select Field</Option>
                {linkedFields.map((group, group_index) => (
                  <OptGroup key={group_index} label={group.group_label}>
                    {group.group_items.map((item, item_index) => (
                      <Option
                        key={group_index + '-' + item_index}
                        value={item.item_value}
                      >
                        {item.item_label}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
              <br />
            </>
          )}
          {!addLinkedField && (
            <Button
              style={{ marginTop: '5px' }}
              type={ButtonTypes.default}
              icon={<PlusOutlined />}
              size="small"
              onClick={() => setAddLinkedField((e) => true)}
            >
              {t('ui.medicalform.setting.linkedfield.add')}
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default SettingLinkedField
