import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/UserContext'

const TaskManagerIFrame = () => {
  const { t } = useTranslation('common')
  const context = useUser()
  const hostUrl = context.me.remote_url
    ? context.me.remote_url
    : 'https://crm.pabau.com'
  const iframeUrl = `${hostUrl}/pages/task_manager/taskmanager.php?user_id=${context.me.id}&company=${context.me.company}`
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
