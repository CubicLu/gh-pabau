import {
  Activity,
  ActivityType,
  User,
  CmContact,
  CmLead,
  LeadStatus,
  CmLeadNote,
  CommunicationRecipient,
  MarketingSource,
  PipelineStage,
  Communication,
} from '@prisma/client'
import { Dayjs } from 'dayjs'

interface WhereInputType {
  startDate?: Date
  endDate?: Date
  activityType?: string[]
  status?: string[]
  userId?: number
  search?: Record<string, string | Record<string, string>>
}

export interface ActivityInputType {
  where?: WhereInputType
  skip?: number
  take?: number
}

interface CommunicationRecipientType extends CommunicationRecipient {
  Communication: Communication
}

export type ActivityData = Activity & {
  ActivityType: ActivityType
  User: User
  CmContact: CmContact & {
    Activity: Activity[]
  }
  CmLead: CmLead & {
    User: User
    Activity: Activity[]
    LeadStatusData: LeadStatus
    CmLeadNote: CmLeadNote[]
    PipelineStage: PipelineStage
    CommunicationRecipient: CommunicationRecipientType[]
    Contact: CmContact
    MarketingSource: MarketingSource
  }
}

export interface LeadNoteType {
  ID: number
  Note: string
  CreatedDate: Date
}

export interface LeadResponse {
  id?: number
  lostReason?: string
  lostTime?: Date
}

export interface ActivityFilterOptionType {
  type?: string
  filterColumn?: string
  operand?: string
  menuOption?: string
}

interface LeadLost {
  id?: number
  reason?: string
  time?: Date
}

interface WonBy {
  full_name?: string
  image?: string
}

export type ActivityResponseType = Activity & {
  ActivityType: ActivityType
  User: User
  CmContact: CmContact & {
    Activity: Activity[]
    clientTotalActivities?: number
  }
  duration: number
  CmLead: CmLead & {
    User: User
    Activity: Activity[]
    LeadStatusData: LeadStatus
    CmLeadNote: CmLeadNote[]
    Contact: CmContact
    MarketingSource: MarketingSource
    PipelineStage: PipelineStage
    CommunicationRecipient: CommunicationRecipientType[]
    leadDoneActivities: number
    firstActivityTime?: Date
    leadLastActivityDate?: Date
    leadLastActivityDays?: number
    leadTotalActivities?: number
    leadActivitesToDo?: number
    leadNextActivityDate: Date
    leadLastEmailReceived?: Date
    emailMessagesCount?: number
    leadLastEmailSend?: Dayjs
    wonBy?: WonBy
    wonTime?: Date
    leadLost?: LeadLost
    leadStage?: string
  }
}
