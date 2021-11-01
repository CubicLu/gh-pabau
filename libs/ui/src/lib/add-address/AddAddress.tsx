import React, { FC } from 'react'
import styles from './AddAddress.module.less'
import { BasicModal } from '@pabau/ui'
import { Form, Input, Button, Select } from 'antd'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
const { Option } = Select

export interface AddressValueProp {
  street: string
  city: string
  county: string
  postCode: string
  country: string
}

export interface AddAddressProps {
  visible?: boolean
  title: string
  onClose?: () => void
  onAdd?: (value: AddressValueProp) => void
  values: AddressValueProp
  isLoading?: boolean
}

export const AddAddress: FC<AddAddressProps> = ({
  visible,
  onClose,
  title,
  onAdd,
  values,
  isLoading,
}) => {
  const [form] = Form.useForm()
  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const save = async (value) => {
    await onAdd?.(value)
    form.resetFields()
  }

  return (
    <BasicModal visible={visible} title={title} onCancel={() => onClose?.()}>
      <Form
        form={form}
        name="address"
        layout="vertical"
        onFinish={(value) => {
          save(value)
        }}
        className={styles.addressWrapper}
      >
        <Form.Item label="Address" name="street" initialValue={values.street}>
          <Input placeholder="Street name" />
        </Form.Item>
        <Form.Item label="City/Town" name="city" initialValue={values.city}>
          <Input placeholder="City or town" />
        </Form.Item>
        <Form.Item label="County" name="county" initialValue={values.county}>
          <Input placeholder="County" />
        </Form.Item>
        <Form.Item
          label="Post code"
          name="postCode"
          initialValue={values.postCode}
        >
          <Input placeholder="Post code" />
        </Form.Item>
        <Form.Item label="Country" name="country" initialValue={values.country}>
          <Select showSearch placeholder="Country" size="large">
            {Object.keys(countriesName).map((c) => (
              <Option key={c} value={countriesName[c]}>
                {countriesName[c]}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className={styles.addButton}>
          <Button
            type={'primary'}
            size={'large'}
            htmlType={'submit'}
            loading={isLoading}
          >
            {title}
          </Button>
        </div>
      </Form>
    </BasicModal>
  )
}

export default AddAddress
