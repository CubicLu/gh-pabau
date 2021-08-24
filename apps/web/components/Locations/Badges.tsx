import {
  CheckCircleFilled,
  LeftOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BasicModal, Button, FontIcon } from '@pabau/ui'
import classNames from 'classnames'
import { Formik } from 'formik'
import { Form as AntForm, Input } from 'formik-antd'
import React, { FC, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './Badges.module.less'

export interface Badge {
  title?: string
  name: string
  icon: IconName | IconDefinition
  selected: boolean
}
export interface BadgesProps {
  title?: string
  description?: string
  badges: Badge[]
  onSelected?: (items: Badge[]) => void
}

export const Badges: FC<BadgesProps> = ({
  badges,
  onSelected,
  title,
  description,
}) => {
  const [badgesItems, setBadgesItems] = useState<Badge[]>([])
  const [addBadgeModal, setAddBadgeModal] = useState(false)
  const { t } = useTranslationI18()
  const handleSelectBadge = (badge) => {
    const items: Badge[] = [...badgesItems]
    for (const item of items) {
      if (item.name === badge.name) item.selected = !item.selected
    }
    setBadgesItems([...items])
    onSelected?.(items.filter((item) => item.selected === true))
  }

  const onCancel = () => {
    setAddBadgeModal((e) => !e)
  }

  useEffect(() => {
    setBadgesItems([...badges])
  }, [badges])

  const addCustomBadge = (values, { resetForm }) => {
    const items = [
      ...badgesItems,
      { icon: values.selectedIcon, name: values.badgeName, selected: true },
    ]
    setBadgesItems(items)
    onSelected?.(items.filter((item) => item.selected === true))
    resetForm()
    setAddBadgeModal((e) => !e)
  }

  const isBadgeNameExist = (badge) => {
    const isExist = badgesItems.filter(
      (item) => item.name.toLowerCase() === badge.toLowerCase().trim()
    )
    return isExist.length > 0 ? true : false
  }

  return (
    <div className={styles.badgesContainer}>
      <h2>{title || t('setup.locations.submenu.badges')}</h2>
      <h3>{description || t('setup.locations.badges.desc.text')}</h3>
      <div className={styles.badgesItems}>
        {badgesItems.map((item) => (
          <div
            className={classNames(
              styles.badgeItem,
              item.selected && styles.selectedItem
            )}
            key={item.name}
            onClick={() => handleSelectBadge(item)}
          >
            <div className={styles.badgeImgContainer}>
              <span
                className={classNames(
                  item.selected ? styles.selectedBadge : styles.badge
                )}
              >
                <FontAwesomeIcon size="1x" icon={item.icon} />
              </span>
            </div>
            <div>
              <span>{item.title ?? item.name}</span>
              <div className={styles.badgeItemChecked}>
                <CheckCircleFilled />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.loadMore}>
        <p>{t('setup.locations.badges.message.attach.your.own.badge')}</p>
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setAddBadgeModal((e) => !e)
          }}
        >
          {t('setup.locations.badges.choose.badge')}
        </Button>
      </div>
      {addBadgeModal && (
        <Formik
          initialValues={{ badgeName: '', selectedIcon: '' }}
          validateOnBlur={false}
          validate={(e) => {
            const errors = {}
            if (!e.badgeName) {
              errors['badgeName'] = t(
                'setup.locations.badges.modal.badge.name.required'
              )
            }
            if (e.badgeName && isBadgeNameExist(e.badgeName)) {
              errors['badgeName'] = t(
                'setup.locations.badges.modal.badge.name.already.exist'
              )
            }
            if (!e.selectedIcon) {
              errors['selectedIcon'] = t(
                'setup.locations.badges.modal.badge.required'
              )
            }
            return errors
          }}
          onSubmit={addCustomBadge}
        >
          {({
            setFieldValue,
            handleSubmit,
            values,
            isValid,
            dirty,
            errors,
          }) => (
            <BasicModal
              title={
                <span className={styles.badgeModalTitle}>
                  <LeftOutlined
                    onClick={() => {
                      setAddBadgeModal((e) => !e)
                    }}
                    style={{ marginRight: 20 }}
                  />{' '}
                  <p>{t('setup.locations.badges.modal.attach.a.badge')}</p>
                </span>
              }
              onCancel={onCancel}
              onOk={() => handleSubmit()}
              newButtonText={t('setup.locations.badges.modal.attach')}
              visible={addBadgeModal}
              isValidate={isValid && dirty}
            >
              <AntForm layout={'vertical'} requiredMark={false}>
                <div className={styles.badgeForm}>
                  <AntForm.Item label={''} name={'badgeName'}>
                    <Input
                      name={'badgeName'}
                      placeholder={t(
                        'setup.locations.badges.badge.name.placeholder'
                      )}
                    />
                  </AntForm.Item>
                  <FontIcon
                    max={120}
                    height={172}
                    selectedIcon={values.selectedIcon}
                    onIconSelected={(icon) => {
                      setFieldValue('selectedIcon', icon)
                    }}
                  />
                  {!values['selectedIcon'] && errors?.selectedIcon && (
                    <span style={{ color: 'red' }}>{errors?.selectedIcon}</span>
                  )}
                </div>
              </AntForm>
            </BasicModal>
          )}
        </Formik>
      )}
    </div>
  )
}

export default Badges
