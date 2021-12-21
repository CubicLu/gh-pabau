import React, { FC } from 'react'
import { Form } from 'antd'

interface FormWrapperProps {
  label?: string
  tooltip?: string
}
const FormWrapper: FC<FormWrapperProps> = ({ label, tooltip, children }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} layout="vertical">
      <Form.Item label={label ?? ''} tooltip={tooltip ?? ''}>
        {children}
      </Form.Item>
    </Form>
  )
}

export default FormWrapper
