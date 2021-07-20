import { Avatar, TickerTile } from '@pabau/ui'
import React, { FC } from 'react'
import { useMedia } from 'react-use'
import { ReactComponent as MessageRead } from '../../assets/images/message-read.svg'
import { ReactComponent as Mail } from '../../assets/images/mail.svg'
import { ReactComponent as NoAppointment } from '../../assets/images/client-card/ticker/no-appointment.svg'
import { ReactComponent as NoAlert } from '../../assets/images/client-card/ticker/no-alert.svg'
import { ReactComponent as NoConversation } from '../../assets/images/client-card/ticker/no-conversation.svg'
import { ReactComponent as NoMedicalHistory } from '../../assets/images/client-card/ticker/no-medical-history.svg'
import { ReactComponent as NoMedication } from '../../assets/images/client-card/ticker/no-medication.svg'
import { ReactComponent as NoProduct } from '../../assets/images/client-card/ticker/no-product.svg'
import { ReactComponent as NoTest } from '../../assets/images/client-card/ticker/no-test.svg'
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
  const mobileWidth = 160
  const height = 177
  const mobileHeight = 160
  const noAlert = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoAlert className={styles.icon} />
    </div>
  )
  const noAppointment = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoAppointment className={styles.icon} />
    </div>
  )
  const noMedicalHistory = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoMedicalHistory className={styles.icon} />
    </div>
  )
  const noMedication = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoMedication className={styles.icon} />
    </div>
  )
  const noProduct = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoProduct className={styles.icon} />
    </div>
  )
  const noTest = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoTest className={styles.icon} />
    </div>
  )
  const noConverstaion = (
    <div className={styles.noTicketItemImage}>
      <div className={styles.circle} />
      <NoConversation className={styles.icon} />
    </div>
  )
  const isMobile = useMedia('(max-width: 576px)', false)

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
            isBlank={nextAppointments.length === 0}
            noItemText="No upcoming appointment"
            noItemImage={noAppointment}
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
                    width: `${(isMobile ? mobileWidth : width) - 32}px`,
                    height: `${(isMobile ? mobileHeight : height) - 64}px`,
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
              isBlank={medicalHistory.length === 0}
              noItemText="No medical history"
              noItemImage={noMedicalHistory}
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
                    width: `${(isMobile ? mobileWidth : width) - 32}px`,
                    height: `${(isMobile ? mobileHeight : height) - 64}px`,
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
              isBlank={medications.length === 0}
              noItemText="No medications"
              noItemImage={noMedication}
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
                    width: `${(isMobile ? mobileWidth : width) - 32}px`,
                    height: `${(isMobile ? mobileHeight : height) - 64}px`,
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
              isBlank={products.length === 0}
              noItemText="No products"
              noItemImage={noProduct}
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
                    width: `${(isMobile ? mobileWidth : width) - 32}px`,
                    height: `${(isMobile ? mobileHeight : height) - 64}px`,
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
              isBlank={tests.length === 0}
              noItemText="No tests"
              noItemImage={noTest}
            />
          </div>
        </div>
        <div className={styles.alertsContainer}>
          <TickerTile
            title="Staff Alerts & Allergies"
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
            noItemText="No alerts"
            noItemImage={noAlert}
            isBlank={alerts.length === 0}
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
                    <div>
                      <span>{user.date}</span>
                      <MessageRead />
                    </div>
                  </div>
                ))}
              </div>,
            ]}
            isBlank={conversation.users.length === 0}
            noItemText="No conversations"
            noItemImage={noConverstaion}
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
