import { Button, Webinar, WebinarModal, WebinarModalProps } from '@pabau/ui'
import React, { FC, useState } from 'react'
import backgroundImage from '../../../assets/images/user.png'
import styles from '../../../pages/setup/setup.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const data = [
  {
    id: '1',
    title: 'Stock Management',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    isJoin: true,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
  {
    id: '2',
    title: 'Advanced Financials',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
  {
    id: '3',
    title: 'Basic Start-Up Training',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
  {
    id: '4',
    title: 'Advanced Financials',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
  {
    id: '5',
    title: 'Basic Start-Up Training',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
  {
    id: '6',
    title: 'Advanced Financials',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
  {
    id: '7',
    title: 'Basic Start-Up Training',
    name: 'Alexander Turner',
    time: 'Tuesday, 15 10:00 AM',
    timeLeft: '18:28',
    backgroundImage,
    description:
      'This training session is to kick start your Pabau journey, suitable for anyone starting off with the system, fron desh, practioers and anyone who nneds to know how to book. It covers all the core features you will need on a daily basisss, to ensure you are able to work at ease with the system.',
  },
]

const WebinarCard: FC = () => {
  const [isOpenModal, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState({})
  const { t } = useTranslationI18()

  const handleOpenModal = (buttonType: string, id?: string) => {
    const filterData = data.find((thread) => thread.id === id)
    const selectedData: WebinarModalProps = {
      ...filterData,
      buttonType: buttonType,
    }
    setModalData(selectedData)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.rightSide}>
        <div className={styles.textTitle}>
          {t('setup.page.live.upcoming.webinar.title')}
        </div>
        <div className={styles.webinarWrapper}>
          {data?.map((value, index) => (
            <Webinar key={index} {...value} onClick={handleOpenModal} />
          ))}
        </div>
        <Button className={styles.btnView}>
          {t('setup.page.live.upcoming.webinar.view.schedule')}
        </Button>
      </div>
      <WebinarModal
        visible={isOpenModal}
        {...modalData}
        onCancel={handleCloseModal}
      />
    </>
  )
}

export default WebinarCard