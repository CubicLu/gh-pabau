import React, { FC, useState ,useEffect } from 'react'
import DropdownWithCheck, { DropdownWithCheckProps } from './DropdownWithCheck'
import { action } from '@storybook/addon-actions'

export default {
    component: DropdownWithCheck,
    title: 'Forms/DropdownWithCheck',
    args: {
       value: '',
        dropdownItems: [{
            key: 'option1',
            label: 'option1'
        },
        {
            key: 'option2',
            label: 'option2'
            }],
       placeHolderText: 'Select any option'
    }
}

const DropdownWithCheckComponent: FC<DropdownWithCheckProps> = ({
    dropdownItems,
    placeHolderText,
    value
}) => {
    const [selected, setSelected] = useState<string>('')

    useEffect(() => {
      if (value)
    setSelected(value)
  }, [value])
    return (
        <DropdownWithCheck
            dropdownItems={dropdownItems}
            placeHolderText={placeHolderText}
            value={selected}
            style={{width: '200px'}}
            onSelected={action('onSelect')}
            />
    )
}

export const DropdownWithCheckStory = DropdownWithCheckComponent.bind({})