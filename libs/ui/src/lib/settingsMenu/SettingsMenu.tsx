import React, { FC } from 'react'
import { Tabs } from 'antd'
import { useMedia } from 'react-use'
import styles from './SettingsMenu.module.less'

const { TabPane } = Tabs
interface P {
  items: {
    key: number
    menuName: string
    component: JSX.Element
  }[]
}

const Menu1 = () => <div>Menu Item #1 Content</div>
const Menu2 = () => <div>Menu Item #2 Content</div>
const Menu3 = () => <div>Menu Item #3 Content</div>
export const SettingsMenu: FC<P> = (props) => {
  const generalSettingsMenu = [
    {
      key: 1,
      menuName: 'Menu Item #1',
      component: <Menu1 />,
    },
    {
      key: 2,
      menuName: 'Menu Item #2',
      component: <Menu2 />,
    },
    {
      key: 3,
      menuName: 'Menu Item #3',
      component: <Menu3 />,
    },
  ]

  const menuItems = props.items || generalSettingsMenu
  const isMobile = useMedia('(max-width: 768px)', false)

  return (
    <div className={styles.settingsMenu}>
      <Tabs
        defaultActiveKey="0"
        tabPosition={isMobile ? 'top' : 'left'}
        style={{ minHeight: '100vh' }}
      >
        {menuItems.map((menu) => (
          <TabPane tab={menu.menuName} key={menu.key}>
            {menu.component}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default SettingsMenu
