import React, { FC } from 'react'
import { ReactComponent as Droplet } from '../../assets/images/droplet.svg'
import { ReactComponent as UserFilled } from '../../assets/images/activities/user-filled.svg'

export interface CustomDropletProps {
  name: string
}

export const CustomIcon: FC<CustomDropletProps> = ({ name }) => {
  const renderIcon = () => {
    const icons = {
      droplet: <Droplet />,
      userFilled: <UserFilled />,
    }
    return icons[name]
  }
  return renderIcon()
}

export default CustomIcon
