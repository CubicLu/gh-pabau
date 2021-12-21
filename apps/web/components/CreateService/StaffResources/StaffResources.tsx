import React, { FC } from 'react'
import { TabMenu, Employees, SearchTags, Checkbox } from '@pabau/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { Employee, CreateServiceType } from '../CreateService'
import styles from '../CreateService.module.less'

interface StaffResourcesProps {
  employeeList: Employee[]
  employeesTitle?: string
  employeesDesc?: string
  handleSelectedEmployees: (item, setFieldValue) => void
  rooms: Array<string>
  roomsTitle?: string
  roomsDesc?: string
  roomsItemType?: string
  equipment: Array<string>
  equipmentTitle?: string
  equipmentDesc?: string
  equipmentItemType?: string
  handleSelectAll: (e) => void
  handleCheckLocation: (e, location, setFieldValue) => void
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const StaffResources: FC<StaffResourcesProps> = ({
  employeeList,
  employeesTitle,
  employeesDesc,
  handleSelectedEmployees,
  rooms,
  roomsTitle,
  roomsDesc,
  roomsItemType,
  equipment,
  equipmentTitle,
  equipmentDesc,
  equipmentItemType,
  handleSelectAll,
  handleCheckLocation,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslationI18()
  return (
    <TabMenu
      menuItems={[
        t(
          'setup.services.servicestab.createmodal.staff&resources.menu.employees'
        ),
        t(
          'setup.services.servicestab.createmodal.staff&resources.menu.resources'
        ),
        t(
          'setup.services.servicestab.createmodal.staff&resources.menu.locations'
        ),
      ]}
      tabPosition="top"
      minHeight="1px"
    >
      <div className={styles.employeesContainer}>
        <div className={styles.createServiceSection}>
          <Employees
            employees={employeeList}
            title={employeesTitle || ''}
            description={employeesDesc || ''}
            onSelected={(items) =>
              handleSelectedEmployees(items, setFieldValue)
            }
          />
        </div>
      </div>
      <div className={styles.resoucesContainer}>
        <div className={styles.createServiceSection}>
          <SearchTags
            title={
              roomsTitle ||
              t(
                'setup.services.servicestab.createmodal.staff&resources.menu.resources.rooms'
              )
            }
            description={
              roomsDesc ||
              t(
                'setup.services.servicestab.createmodal.staff&resources.menu.resources.rooms.subtitle'
              )
            }
            items={rooms}
            itemType={
              roomsItemType ||
              t(
                'setup.services.servicestab.createmodal.staff&resources.menu.resources.rooms.item'
              )
            }
            selectedItems={values.roomResources}
            onChange={(val) => {
              setFieldValue('roomResources', val)
            }}
            noItemText={t('ui.searchtag.noitem')}
            selectAllText={t('ui.searchtag.selectall')}
          />
        </div>
        <div className={styles.createServiceSection}>
          <SearchTags
            title={
              equipmentTitle ||
              t(
                'setup.services.servicestab.createmodal.staff&resources.menu.resources.equipment'
              )
            }
            description={
              equipmentDesc ||
              t(
                'setup.services.servicestab.createmodal.staff&resources.menu.resources.equipment.subtitle'
              )
            }
            items={equipment}
            itemType={
              equipmentItemType ||
              t(
                'setup.services.servicestab.createmodal.staff&resources.menu.resources.equipment.item'
              )
            }
            selectedItems={values.equipmentResources}
            onChange={(val) => {
              setFieldValue('equipmentResources', val)
            }}
            noItemText={t('ui.searchtag.noitem')}
            selectAllText={t('ui.searchtag.selectall')}
          />
        </div>
      </div>
      <div className={styles.locationsContainer}>
        <div className={styles.createServiceSection}>
          <h2
            className={styles.createServiceSectionTitle}
            style={{ margin: 0 }}
          >
            {t(
              'setup.services.servicestab.createmodal.staff&resources.menu.locations'
            )}
          </h2>
          <h3
            className={styles.createServiceSectionSubTitle}
            style={{ marginBottom: '1rem' }}
          >
            {t(
              'setup.services.servicestab.createmodal.staff&resources.menu.locations.subtitle'
            )}
          </h3>
          <div className={styles.locationItem}>
            <Checkbox
              defaultChecked={true}
              onChange={(e) => handleSelectAll(e)}
            >
              {t(
                'setup.services.servicestab.createmodal.staff&resources.menu.locations.selectall'
              )}
            </Checkbox>
          </div>
          {values.locData?.map((location) => (
            <div key={location.location} className={styles.locationItem}>
              <Checkbox
                defaultChecked={location.selected}
                checked={location.selected}
                onChange={(e) =>
                  handleCheckLocation(e, location, setFieldValue)
                }
              >
                {location.location}
                {location?.badges?.map((badge, index) => (
                  <span key={index} style={{ marginLeft: '8px' }}>
                    <FontAwesomeIcon color={'#9292A3'} size="1x" icon={badge} />
                  </span>
                ))}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    </TabMenu>
  )
}

export default StaffResources
