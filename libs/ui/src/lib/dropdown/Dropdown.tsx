import {
  CaretDownOutlined,
  CheckCircleFilled,
  ExclamationOutlined,
  ExportOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  LoadingOutlined,
  NotificationOutlined,
  PlaySquareOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Drawer,
  Image,
  Menu,
  Popover,
  Spin,
  Typography as Text,
  Tooltip,
} from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import QueueAnim from 'rc-queue-anim'
import React, { FC, useState } from 'react'
import { languageMenu } from '../../assets/images/lang-logos'
import { ReactComponent as LaunchSVG } from '../../assets/images/launch.svg'
import { ReactComponent as TaskSVG } from '../../assets/images/Vector.svg'
import { ExtraUserData } from '@pabau/ui'
import styles from './Dropdown.module.less'
import { useTranslation } from 'react-i18next'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'

export interface DropDownInterface {
  isOpen?: boolean
  onCloseDrawer?: () => void
  onLogOut?(): void
  userData?: Partial<AuthenticatedUser> & JwtUser & ExtraUserData
  taskManagerIFrameComponent?: JSX.Element
  emailCount?: number
}

export const Dropdown: FC<DropDownInterface> = ({
  isOpen,
  onCloseDrawer,
  onLogOut,
  taskManagerIFrameComponent,
  userData,
  emailCount,
}): JSX.Element => {
  const { t } = useTranslation('common')
  const [activeMenu, setActiveMenu] = useState('Menu')
  const [openProfileDrawer, setProfileDrawer] = useState(isOpen)
  const [activeMenuTitle, setActiveMenuTitle] = useState('Profile')

  const switchCompanyHandler = (item) => {
    Number.parseInt(item.key) > 0
      ? userData?.handleCompanySwitch?.(Number.parseInt(item.key))
      : console.warn('No Company Selected')
  }

  const menu = (
    <Menu className={styles.avatarMenu}>
      <Menu.Item
        key="logo"
        className={classNames(styles.dropdownMenu, styles.clinicHeader)}
        onClick={() => onClickAvatarMenu('ClinicMenu')}
      >
        <div className={styles.dropdownHeader}>
          <span className={styles.headerText}>
            {userData?.companyName || '<no name>'}
          </span>
          <RightOutlined className={styles.dropdownIcon} />
        </div>
      </Menu.Item>
      <Menu.Item className={styles.userinfo} key="userName">
        <div className={styles.userName}>
          {userData?.fullName || '<no name>'}
          {userData?.pab1 && <>{` `}(Pabau 1 linked)</>}
        </div>
        {/* TODO */}
        {/* <div className={styles.userBalance}>
          <p>{t('avatar.balance')}</p>
          <span>9445,00</span>
        </div> */}
      </Menu.Item>
      <Menu.Item
        key="account"
        className={classNames(styles.dropdownMenu, styles.avatarSpaceTop)}
      >
        <div className={styles.dropdownHeader}>
          <UserOutlined style={{ color: '#9292A3' }} />
          <Link href="/account/settings">
            <span className={styles.headerText}>
              {t('avatar.account.settings')}
            </span>
          </Link>
        </div>
        {/* <LaunchSVG className={styles.launchLogo} /> */}
      </Menu.Item>
      <Menu.Item
        key="Email"
        className={classNames(styles.dropdownMenu, styles.avatarSpaceTop)}
      >
        <div className={styles.dropdownHeader}>
          <MailOutlined style={{ color: '#9292A3' }} />
          <Link href="/setup/gmail/inbox">
            <span className={styles.headerText}>
              {t('avatar.account.mail')}
              {Boolean(emailCount) && (
                <Badge
                  count={emailCount}
                  style={{ backgroundColor: '#40A0C1', marginLeft: '10px' }}
                />
              )}
            </span>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item
        key="task"
        className={styles.dropdownMenu}
        style={{ borderBottom: '1px solid #F1F1F1' }}
        onClick={() => onClickAvatarMenu('TaskManagerMenu')}
      >
        <div className={styles.dropdownHeader}>
          <TaskSVG />
          <span className={classNames(styles.headerText, styles.taskText)}>
            {t('avatar.tasks')}
          </span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="feedback"
        className={classNames(styles.dropdownMenu, styles.avatarSpaceTop)}
        onClick={() => onClickAvatarMenu('FeedbackMenu')}
      >
        <div className={styles.dropdownHeader}>
          <NotificationOutlined className={styles.dropdownIcon} />
          <span className={styles.headerText}>{t('avatar.give.feedback')}</span>
          <RightOutlined className={styles.dropdownIcon} />
        </div>
      </Menu.Item>
      <Menu.Item
        key="help"
        className={styles.dropdownMenu}
        onClick={() => onClickAvatarMenu('HelpMenu')}
      >
        <div className={styles.dropdownHeader}>
          <QuestionCircleOutlined className={styles.dropdownIcon} />
          <span className={styles.headerText}>{t('avatar.help.support')}</span>
          <RightOutlined className={styles.dropdownIcon} />
        </div>
      </Menu.Item>
      {/* TODO Temp commenting it out due to translation not being part of the MVP
       <Menu.Item
        key="language"
        className={styles.dropdownMenu}
        onClick={() => onClickAvatarMenu('LangMenu')}
      >
        <div className={styles.dropdownHeader}>
          <GlobalOutlined className={styles.dropdownIcon} />
          <span className={styles.headerText}>English</span>
        </div>
        <RightOutlined className={styles.dropdownIcon} />
      </Menu.Item> */}
      <Menu.Item
        key="logout"
        onClick={onLogOut}
        className={styles.dropdownMenu}
      >
        <div className={styles.dropdownHeader}>
          <ExportOutlined className={styles.dropdownIcon} />
          <span className={styles.headerText}>{t('avatar.logout')}</span>
        </div>
      </Menu.Item>
      <div style={{ marginTop: '8px' }} />
    </Menu>
  )

  const ClinicSubMenu = (
    <QueueAnim interval={300}>
      <Menu
        key="2"
        className={styles.avatarSubMenu}
        onClick={switchCompanyHandler}
      >
        <Menu.Item
          key={null}
          className={styles.subDropdownList}
          onClick={() => onClickAvatarMenu('Menu')}
          style={{ height: '56px' }}
        >
          <div className={styles.subDropdownListHeader}>
            <LeftOutlined className={styles.subLogo} />
            <span className={styles.subHeaderText}>
              {t('avatar.change.company')}
            </span>
          </div>
        </Menu.Item>
        {userData?.companies?.map((company) => {
          return (
            <Menu.Item key={company.id} className={styles.subDropdownList}>
              <div className={styles.subDropdownListHeader}>
                <Text> {company.name} </Text>
              </div>
              {userData?.companyName === company.name ? (
                <CheckCircleFilled
                  className={classNames(styles.checkIcon, styles.activeMenu)}
                />
              ) : (
                ''
              )}
            </Menu.Item>
          )
        })}
      </Menu>
    </QueueAnim>
  )

  const FeedbackMenu = (
    <QueueAnim interval={600}>
      <Menu key="3" className={styles.avatarHelpMenu}>
        <Menu.Item
          key="giveUsFeedback"
          className={classNames(styles.avatarHelpSubList)}
          onClick={() => setActiveMenu('Menu')}
          style={{ height: '56px' }}
        >
          <div className={styles.feedbackAlignContent}>
            <LeftOutlined className={styles.subLogo} />
            <p className={styles.subHeaderText}>
              {t('avatar.give.feedback.giveus')}
            </p>
          </div>
        </Menu.Item>
        <Menu.Item
          key="helpUs"
          className={styles.avatarHelpSubList}
          onClick={() =>
            window.open(
              'https://community.pabau.com/c/feature-requests/5',
              '_blank'
            )
          }
        >
          <div
            className={classNames(
              styles.feedbackAlignContent,
              styles.feedbackSpaceContent
            )}
          >
            <span>
              <InfoCircleOutlined className="" />
              <span className="">{t('avatar.give.feedback.helpus')}</span>
            </span>
            <LaunchSVG className={styles.launchLogo} />
          </div>
        </Menu.Item>
        <Menu.Item
          key="SomethingWentWrong"
          className={styles.avatarHelpSubList}
        >
          <div className={styles.feedbackAlignContent}>
            <ExclamationOutlined className="" />
            <span className="">{t('avatar.give.feedback.somethingwrong')}</span>
          </div>
        </Menu.Item>
        <div style={{ marginTop: '8px' }} />
      </Menu>
    </QueueAnim>
  )

  const HelpMenu = (
    <QueueAnim interval={600}>
      <Menu key="4" className={styles.avatarHelpMenu}>
        <Menu.Item
          key="helpSupport"
          className={classNames(styles.avatarHelpSubList)}
          onClick={() => onClickAvatarMenu('Menu')}
          style={{ height: '56px' }}
        >
          <div className={styles.feedbackAlignContent}>
            <LeftOutlined className={styles.subLogo} />
            <p className={styles.subHeaderText}>
              {t('avatar.help.support.header')}
            </p>
          </div>
        </Menu.Item>
        <Menu.Item key="helpCentre" className={styles.avatarHelpSubList}>
          <div className={styles.feedbackAlignContent}>
            <QuestionCircleOutlined className="" />
            <span className="">{t('avatar.help.support.centre')}</span>
          </div>
        </Menu.Item>
        <Menu.Item className={styles.avatarHelpSubList}>
          <div className={styles.feedbackAlignContent}>
            <PlaySquareOutlined className="" />
            <span key="videoGuides" className="">
              {t('avatar.help.video.guides')}
            </span>
          </div>
        </Menu.Item>
        <Menu.Item key="contactSupport" className={styles.avatarHelpSubList}>
          <div className={styles.feedbackAlignContent}>
            <ExclamationOutlined className="" />
            <span className="">{t('avatar.help.contact.support')}</span>
          </div>
        </Menu.Item>
        <div style={{ marginTop: '8px' }} />
      </Menu>
    </QueueAnim>
  )

  const LangMenu = (
    <QueueAnim interval={600}>
      <Menu key="5" className={styles.avatarHelpMenu}>
        <Menu.Item
          key="selectLanguage"
          className={styles.langSubDropdownMenu}
          onClick={() => onClickAvatarMenu('Menu')}
          style={{ height: '56px' }}
        >
          <div className={styles.langAlignContent}>
            <LeftOutlined className="" />
            <p className="">{t('avatar.select.language')}</p>
          </div>
        </Menu.Item>
        {languageMenu.map((lang, index) => {
          return (
            <Menu.Item key={index} className={styles.languageTextAlign}>
              <div className={styles.languageFlagCenter}>
                <Image
                  src={lang.logo}
                  alt={lang.label}
                  preview={false}
                  width="16px"
                  height="16px"
                />
                <span className={lang.selected ? styles.activeMenu : undefined}>
                  {lang.label}
                </span>
              </div>
              {lang.selected && (
                <CheckCircleFilled
                  className={classNames(styles.checkIcon, styles.activeMenu)}
                />
              )}
            </Menu.Item>
          )
        })}
        <div style={{ marginTop: '8px' }} />
      </Menu>
    </QueueAnim>
  )

  const TaskManagerMenu = (
    <QueueAnim interval={600}>
      <Menu key="6" className={styles.avatarHelpMenu}>
        <Menu.Item
          key="taskManager"
          className={styles.langSubDropdownMenu}
          onClick={() => onClickAvatarMenu('Menu')}
          style={{ height: '56px' }}
        >
          <div className={styles.langAlignContent}>
            <LeftOutlined className="" />
            <p className="">{t('avatar.task_manager')}</p>
          </div>
        </Menu.Item>
        <div style={{ marginTop: '8px' }} />
        {taskManagerIFrameComponent ? (
          taskManagerIFrameComponent
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
      </Menu>
    </QueueAnim>
  )

  const onClickAvatarMenu = (menuName: string) => {
    switch (menuName) {
      case 'Menu': {
        setActiveMenuTitle('Profile')
        break
      }
      case 'ClinicMenu': {
        setActiveMenuTitle('Select company')

        break
      }
      case 'FeedbackMenu': {
        setActiveMenuTitle('Give us feedback')

        break
      }
      case 'HelpMenu': {
        setActiveMenuTitle('Help & Support')

        break
      }
      case 'LangMenu': {
        setActiveMenuTitle('Select language')

        break
      }
      case 'TaskManager': {
        setActiveMenuTitle('Task Manager')
      }
      // No default
    }
    setActiveMenu(menuName)
  }

  const getActiveAvatarMenu = () => {
    switch (activeMenu) {
      case 'Menu': {
        return menu
        break
      }
      case 'ClinicMenu': {
        return ClinicSubMenu
        break
      }
      case 'FeedbackMenu': {
        return FeedbackMenu
        break
      }
      case 'HelpMenu': {
        return HelpMenu
        break
      }
      case 'LangMenu': {
        return LangMenu
        break
      }
      case 'TaskManagerMenu': {
        return TaskManagerMenu
      }
      // No default
    }
  }

  const onClickMobileBackToMenu = () => {
    if (activeMenu !== 'Menu') {
      setActiveMenuTitle('Profile')
      setActiveMenu('Menu')
    } else {
      setProfileDrawer(false)
      onCloseDrawer?.()
    }
  }

  return (
    <div>
      <div className={styles.mobileViewNone}>
        <Popover
          content={getActiveAvatarMenu}
          trigger="click"
          placement="bottomRight"
          overlayClassName={styles.avatarPopover}
        >
          <Tooltip
            placement="bottomRight"
            title={
              <div
                style={{
                  paddingLeft: 10,
                  fontSize: 11,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span>{userData?.fullName}</span>
                <span>{userData?.companyName}</span>
              </div>
            }
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Badge
                dot
                color="#65CD98"
                offset={[-2, 30]}
                size="default"
                style={{ height: '8px', width: '8px' }}
              >
                <Avatar
                  src={
                    userData?.imageUrl
                      ? `${'https://cdn.pabau.com'}${userData.imageUrl}`
                      : null
                  }
                  size={40}
                  icon={<UserOutlined />}
                />
              </Badge>

              <CaretDownOutlined
                style={{ paddingLeft: '5px', color: '#9292A3' }}
              />
            </div>
          </Tooltip>
        </Popover>
      </div>

      <Drawer
        visible={openProfileDrawer}
        placement="left"
        closable={false}
        className={classNames(styles.mobileAvatarDrawar)}
      >
        <div className={styles.mobileViewAlign}>
          <div className={styles.mobileViewHeaderHeading}>
            <LeftOutlined onClick={onClickMobileBackToMenu} />
            <p>{activeMenuTitle}</p>
          </div>
        </div>
        <div className={styles.avatarPopover}>{getActiveAvatarMenu()}</div>
      </Drawer>
    </div>
  )
}

export default Dropdown
