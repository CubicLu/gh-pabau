import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useTranslation } from 'react-i18next'

const TaskManagerIFrame = () => {
  const { t } = useTranslation('common')
  const context = useContext(UserContext)
  const hostUrl = context.me.company.remote_url
    ? context.me.company.remote_url
    : 'https://crm.pabau.com'
  const iframeUrl = `${hostUrl}/pages/task_manager/taskmanager.php?user_id=${context.me.id}&company=${context.me.company.id}`
  return (
    <iframe
      title="task-manager-iframe"
      src={iframeUrl}
      frameBorder="0"
      height="500px"
    >
      {t('iframe-incompatible')}
    </iframe>
  )
}

export default TaskManagerIFrame
