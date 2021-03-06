import React from 'react'
import { SimpleDropdown, Input } from '@pabau/ui'
import { Row, Col } from 'antd'

interface AdvanceFieldInterface {
  options: []
  handleSelected: () => void
  input: SchemaItem
}
interface TypeValues {
  label: string
  value: string
}

const AdvanceField: React.FC<AdvanceFieldInterface> = ({
  options,
  input,
  handleSelected,
}) => {
  const dropdownoptions = options?.map((option: TypeValues) => option.label)
  return (
    <Row gutter={8}>
      {options?.map((option: TypeValues, i: number) => (
        <Col key={i}>
          <SimpleDropdown
            style={{ minWidth: '192px', width: '100%' }}
            size="large"
            dropdownItems={dropdownoptions ? dropdownoptions : []}
            value={option?.value}
            onSelected={handleSelected}
          />
        </Col>
      ))}
      {input && (
        <Col>
          <Input
            style={{ minWidth: 'min-content', width: '100%' }}
            name={input?.full}
            type={input?.type}
            placeHolderText={input?.example}
          />
        </Col>
      )}
    </Row>
  )
}

export default AdvanceField
