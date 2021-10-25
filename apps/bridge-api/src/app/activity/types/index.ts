import {
  Activity,
  ActivityType,
  User,
  CmContact,
  CmLead,
  LeadStatus,
  CmLeadNote,
  CommunicationRecipient
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
