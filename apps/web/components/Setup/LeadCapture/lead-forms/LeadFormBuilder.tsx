import { ColorPicker, FieldType, RegistrationFields } from '@pabau/ui'
import { Row, Select } from 'antd'
import classNames from 'classnames'
import React from 'react'
import styles from './LeadForms.module.less'

const { Option } = Select

interface colors {
  fontColor: string
  buttonColor: string
}
interface LeadFormBuilderInterface {
  fields: FieldType[]
  colours: colors
  onChange?: (mainField: FieldType[]) => void
  onColorChange: (fontColor: string, buttonColor: string) => void
}

export const LeadFormBuilder: React.FC<LeadFormBuilderInterface> = ({
  fields,
  colours = { fontColor: '', buttonColor: '' },
  onChange,
  onColorChange,
}) => {
  const onMainFieldCheckboxChange = (e, key: number, checkboxField: string) => {
    onChange?.(
      fields.map((record) => {
        if (record.key === key) {
          record[checkboxField] = e.target.checked
        }
        return record
      })
    )
  }

  return (
    <>
      <Row className={classNames(styles.headerStyle, styles.mobileViewNone)}>
        <div>BUILDER</div>
      </Row>
      <Row>
        <div className={styles.builderBox}>
          <div className={styles.builderHeadingText}>
            <h1> Apperance</h1>
            <p>
              Here we can customize the look and feel of your lead capture form
            </p>
          </div>
          <div className={styles.builderHeadingText}>
            <h1> Font colour </h1>
          </div>
          <div className={styles.colorPickerDiv}>
            <ColorPicker
              selectedColor={colours.fontColor}
              onSelected={(val) => onColorChange(val, colours.buttonColor)}
              heading={''}
            />
          </div>
          <div className={styles.secFontColor}>
            <h1>Button colour</h1>
          </div>
          <div className={styles.colorPickerDiv}>
            <ColorPicker
              selectedColor={colours.buttonColor}
              onSelected={(val) => onColorChange(colours.fontColor, val)}
              heading={''}
            />
          </div>
          <div className={styles.photoUploadText}>
            <h1>Enable photo upload</h1>
          </div>
          <Select defaultValue="1" style={{ width: '100%' }}>
            <Option value="1">1 Photo</Option>
            <Option value="5">5 Photos</Option>
            <Option value="10">10 Photos</Option>
          </Select>
        </div>
        <div className={styles.builderBorderBottom}></div>
        <div className={styles.builderBox}>
          <div className={styles.builderHeadingText}>
            <h1>Fields</h1>
            <p></p>
          </div>
          <RegistrationFields
            fields={fields}
            description={
              'Include which fields you would like to be required or completed as part of your lead form.'
            }
            requiredTitle={'Required'}
            fieldTitle={'Field Name'}
            visibleTitle={'Visible'}
            // onCustomFieldCheckboxChange={onCustomFieldCheckboxChange}
            onMainFieldCheckboxChange={onMainFieldCheckboxChange}
          />
        </div>
      </Row>
    </>
  )
}

export default LeadFormBuilder
