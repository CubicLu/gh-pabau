import React, { FC } from 'react'
import {
  FilterOutlined,
  ProjectOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import styles from './LeadsNavigation.module.less'
import {
  Input,
  ButtonSize,
  Button,
  ButtonTypes,
  DropdownWithCheck,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'

export interface LeadsNavigationProps {
  onProjectClickHandler?: () => void
  onMenuClickHandler?: () => void
  onSelectLeadsHandler?: (selectedOption) => void
  leadCount: number
  leadsItems?: DropdownItemType[]
  onSelectInboundLeadsHandler?: (selectedOption) => void
  InboundLeadsItems?: DropdownItemType[]
  onInputChange?: (text) => void
  onSelectOptionHandler?: (selectedOption) => void
  optionItems?: DropdownItemType[]
  onCreateLeadHandler?: () => void
}

interface DropdownItemType {
  key: string
  label: string
}

export const LeadsNavigation: FC<LeadsNavigationProps> = ({
  onProjectClickHandler,
  onMenuClickHandler,
  onSelectLeadsHandler,
  leadCount,
  leadsItems,
  onSelectInboundLeadsHandler,
  InboundLeadsItems,
  onInputChange,
  onSelectOptionHandler,
  optionItems,
  onCreateLeadHandler,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.leadsNaveRoot}>
      <div className={styles.leadsCount}>
        <h4>{t(`kanban-board.leads.leads-per-stage`)}</h4>
        <div className={styles.tickerCount}>{leadCount}</div>
      </div>
      <div className={styles.leadsNaveOption}>
        <div className={styles.section}>
          <Button
            disabled={false}
            loading={false}
            icon={<ProjectOutlined />}
            onClick={onProjectClickHandler}
          />
        </div>
        <div className={styles.section}>
          <Button
            disabled={false}
            loading={false}
            icon={<MenuOutlined />}
            onClick={onMenuClickHandler}
          />
        </div>
        <div className={styles.section}>
          <div>
            <FilterOutlined className={styles.marketingIconStyle} />
          </div>
          <DropdownWithCheck
            placeHolderText={`Select Leads`}
            value={t(`kanban-board.lead-nave.new-leads`)}
            onSelected={onSelectLeadsHandler}
            dropdownItems={leadsItems}
            disabled={false}
          />
        </div>
        <div className={styles.section}>
          <div>
            <FilterOutlined
              className={styles.marketingIconStyle}
              onClick={() => {
                console.log('OnFilter')
              }}
            />
          </div>
          <DropdownWithCheck
            placeHolderText={`Select Inbound Leads`}
            value={t(`kanban-board.lead-nave.inbound-leads`)}
            onSelected={onSelectInboundLeadsHandler}
            dropdownItems={InboundLeadsItems}
            disabled={false}
          />
        </div>
        <div className={styles.section}>
          <Input
            placeholder={`Search by name`}
            suffix={<SearchOutlined />}
            size={ButtonSize.large}
            onChange={onInputChange}
          />
        </div>
        <div className={styles.section}>
          <div className={styles.selectOption}>
            <DropdownWithCheck
              placeHolderText={`Select Option`}
              value={t(`kanban-board.lead-nave.options`)}
              onSelected={onSelectOptionHandler}
              dropdownItems={optionItems}
              disabled={false}
            />
          </div>
        </div>
        <div className={styles.section}>
          <Button
            type={ButtonTypes.primary}
            disabled={false}
            className={styles.createLeadBtn}
            loading={false}
            onClick={onCreateLeadHandler}
          >
            {t(`kanban-board.lead-nave.create-lead`)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeadsNavigation
