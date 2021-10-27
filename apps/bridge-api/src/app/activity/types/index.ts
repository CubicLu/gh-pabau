import {
  Activity,
  ActivityType,
  User,
  CmContact,
  CmLead,
  LeadStatus,
  CmLeadNote,
  CommunicationRecipient,
  MarketingSource
} from '@prisma/client'

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
    CommunicationRecipient: CommunicationRecipient[]
    CmContact: CmContact
    MarketingSource: MarketingSource
  }
}

export interface LeadNoteType {
  Note: string
  CreatedDate: Date
}

export interface LeadResponse {
  lostReason?: string
  lostTime?: Date
}

export interface ActivityFilterOptionType {
  type?: string
  filterColumn?: string
  operand?: string
  menuOption?: string
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
    CmContact: CmContact
    MarketingSource: MarketingSource
    CommunicationRecipient: CommunicationRecipient[]
    leadDoneActivities: number
    firstActivityTime?: Date
    leadLastActivityDate?: Date
    leadLastActivityDays?: number
    leadTotalActivities?: number
    leadActivitesToDo?: number
    leadNextActivityDate: Date
    leadLostTime?: Date
    leadLastEmailReceived?: Date
    emailMessagesCount?: number
    leadLastEmailSend?: Date
    wonBy?: string
    wonTime?: Date
    leadLostReason?: string
    leadStage?: string
  }
}
