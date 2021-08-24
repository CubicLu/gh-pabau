import React from 'react'
import TeamReportModalComponent, {
  TeamReportModalProps,
} from './TeamReportModal'
import { ticks, seriesData } from './mock'

export default {
  component: TeamReportModalComponent,
  title: 'UI/Team Report Modal',
}

const TeamReportModalTemplate = ({ ...args }: TeamReportModalProps) => {
  return <TeamReportModalComponent {...args} />
}

export const TeamReportModalStory = TeamReportModalTemplate.bind({})
TeamReportModalStory.args = {
  ticks: ticks,
  series: seriesData,
  type: 'line',
  prefix: '£',
  suffix: 'K',
  visible: true,
  employee: 'Total Team',
  service: 'Services Revenue',
  description:
    'Two-factor authentication adds an extra layer of security to your Pabau account. By asking you to enter a verification code after entering the correct email address and password, it will protect you from potential attackers who also might have gained access to your email address.',
}
