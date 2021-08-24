import { Modal, Form, Input } from 'antd'

interface Values {
  page_url: string
  legacy_url: string
}

interface NewFeatureModalProps {
  visible: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

export const NewFeatureModal: React.FC<NewFeatureModalProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title="Add new feature toggle"
      okText={'Create'}
      cancelText={'Cancel'}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((error) => {
            console.log('Validate Failed:', error)
          })
      }}
      onCancel={onCancel}
    >
      <Form form={form} name="new_feature" initialValues={{ remember: false }}>
        <Form.Item
          label="Page URL"
          name="page_url"
          rules={[{ required: true, message: 'Enter page URL' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Legacy URL"
          name="legacy_url"
          rules={[{ required: true, message: 'Enter legacy page URL' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
