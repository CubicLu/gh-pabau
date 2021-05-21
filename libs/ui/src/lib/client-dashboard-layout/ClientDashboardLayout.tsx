import { Avatar, TickerTile } from '@pabau/ui'
import React, { FC } from 'react'
import { ReactComponent as Mail } from '../../assets/images/mail.svg'
import styles from './ClientDashboardLayout.module.less'

interface NextAppointment {
  category: string
  image: string
  title: string
  description: string
}

interface MedicalHistory {
  category: string
  descriptions: string[]
  date: string
}

interface Medication {
  category: string
  descriptions: { name: string; amount: string }[]
  date: string
}

interface Product {
  category: string
  descriptions: string[]
  date: string
}

interface Test {
  category: string
  descriptions: string[]
  tester: string
  date: string
}

interface Conversation {
  category: string
  users: {
    id: number
    avatarUrl: string
    name: string
    type: string
    date: string
  }[]
}

export interface ClientDashboardLayoutProps {
  nextAppointments: NextAppointment[]
  medicalHistory: MedicalHistory[]
  medications: Medication[]
  products: Product[]
  tests: Test[]
  alerts: string[]
  conversation: Conversation
}

export const ClientDashboardLayout: FC<ClientDashboardLayoutProps> = ({
  nextAppointments,
  medicalHistory,
  medications,
  products,
  tests,
  alerts,
  conversation,
}) => {
  const width = 177
  const height = 177

  return (
    <div className={styles.clientDashboardLayout}>
      {/* ticker tiles */}
      <div>
        <div className={styles.nextAppointmentContainer}>
          <TickerTile
            items={nextAppointments.map((item, index) => (
              <div
                className={styles.tile}
                key={`next-appointment-item-${index}`}
                style={{ height: '72px' }}
              >
                <div className={styles.content}>
                  <div
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  />
                  <div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.description}>{item.description}</div>
                  </div>
                </div>
              </div>
            ))}
            speed={4500}
            title="Next appointments"
            showCount={true}
          />
        </div>
        <div className={styles.medicalHistoryContainer}>
          <div>
            <TickerTile
              items={medicalHistory.map((item, index) => (
                <div
                  key={`medical-history-item-${index}`}
                  className={styles.squareTile}
                  style={{
                    width: `${width - 32}px`,
                    height: `${height - 64}px`,
                  }}
                >
                  <div>
                    {item.descriptions.map((description, index) => (
                      <div
                        className={styles.description}
                        key={`medical-history-description-${index}`}
                      >
                        {description}
                      </div>
                    ))}
                  </div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              ))}
              speed={8000}
              title="Medical history"
            />
          </div>
        </div>
        <div className={styles.medicationsContainer}>
          <div>
            <TickerTile
              items={medications.map((item, index) => (
                <div
                  key={`medication-item-${index}`}
                  className={styles.squareTile}
                  style={{
                    width: `${width - 32}px`,
                    height: `${height - 64}px`,
                  }}
                >
                  <div>
                    {item.descriptions.map((description, index) => (
                      <React.Fragment key={`medication-description-${index}`}>
                        <div className={styles.descriptionTitle}>
                          {description.name}
                        </div>
                        <div className={styles.descriptionContent}>
                          {description.amount}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              ))}
              speed={3500}
              title="Medications"
            />
          </div>
        </div>
        <div className={styles.productsContainer}>
          <div>
            <TickerTile
              title="Products"
              items={products.map((item, index) => (
                <div
                  key={`product-item-${index}`}
                  className={styles.squareTile}
                  style={{
                    width: `${width - 32}px`,
                    height: `${height - 64}px`,
                  }}
                >
                  <div>
                    {item.descriptions.map((description, index) => (
                      <div
                        className={styles.description}
                        key={`product-description-${index}`}
                      >
                        {description}
                      </div>
                    ))}
                  </div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              ))}
              speed={3000}
              showDots={true}
            />
          </div>
        </div>
        <div className={styles.testsContainer}>
          <div>
            <TickerTile
              title="Tests"
              items={tests.map((item, index) => (
                <div
                  key={`test-item-${index}`}
                  className={styles.squareTile}
                  style={{
                    width: `${width - 32}px`,
                    height: `${height - 64}px`,
                  }}
                >
                  <div>
                    {item.descriptions.map((description, index) => (
                      <div
                        className={styles.description}
                        key={`test-description-${index}`}
                      >
                        {description}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className={styles.tester}>{item.tester}</div>
                    <div className={styles.date}>{item.date}</div>
                  </div>
                </div>
              ))}
              speed={5000}
              showCount={true}
            />
          </div>
        </div>
        <div className={styles.alertsContainer}>
          <TickerTile
            title="Alerts"
            items={[
              <div
                key={'alert-tile-1'}
                className={styles.tile}
                style={{ width: '100%' }}
              >
                <div className={styles.staffAlerts}>
                  <div className={styles.content}>
                    {alerts.map((item, index) => (
                      <div
                        className={styles.staffAlert}
                        key={`staff-alert-${index}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>,
            ]}
            speed={2500}
          />
        </div>
        <div className={styles.latestConversationsContainer}>
          <TickerTile
            title="Latest conversations"
            items={[
              <div
                key={'latest-conversations-1'}
                className={styles.tile}
                style={{ width: '100%' }}
              >
                {conversation.users.map((user, index) => (
                  <div
                    className={styles.conversation}
                    key={`conversation-item-${index}`}
                  >
                    <div>
                      <Avatar src={user.avatarUrl} name={user.name} size={24} />
                    </div>
                    <div>
                      <div className={styles.name}>{user.name}</div>
                      <div className={styles.type}>
                        <Mail style={{ marginRight: '4px' }} />
                        {user.type}
                      </div>
                    </div>
                    <div>{user.date}</div>
                  </div>
                ))}
              </div>,
            ]}
            speed={2500}
          />
        </div>
      </div>
      {/* acitivity part */}
      <div></div>
    </div>
  )
}

export default ClientDashboardLayout
