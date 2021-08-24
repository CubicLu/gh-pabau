import React, { FC } from 'react'
import { ReactComponent as Droplet } from '../../assets/images/droplet.svg'

export interface CustomDropletProps {
  name: string
}

export const CustomIcon: FC<CustomDropletProps> = ({ name }) => {
  const renderIcon = () => {
    const icons = {
      droplet: <Droplet />,
    }
    return icons[name]
  }
  return renderIcon()
}

export default CustomIcon
