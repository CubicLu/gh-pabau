import { Context } from '../../context'
import { LeadNoteType, LeadResponse } from './types'

export const retrieveActivityGraphData = async (
  ctx: Context,
  input,
  searchQuery
) => {
  const graphQuery = await ctx.prisma.activity.groupBy({
    by: ['status'],
    where: {
      due_start_date: {
        gte: input.where?.startDate,
        lte: input.where?.endDate,
      },
      ActivityType: { name: { in: input.where?.activityType } },
      status: { in: input.where?.status },
      AssignedUser: {
        id: { equals: input.where?.userId },
      },
      AND: {
        OR: searchQuery,
      },
    },
    _count: {
      id: true,
    },
  })

  return {
    reopened: graphQuery?.find((item) => item.status === 'Reopened')?._count
      ?.id,
    awaiting: graphQuery?.find((item) => item.status === 'Awaiting')?._count
      ?.id,
    done: graphQuery?.find((item) => item.status === 'Done')?._count?.id,
    pending: graphQuery?.find((item) => item.status === 'Pending')?._count?.id,
    working: graphQuery?.find((item) => item.status === 'Working on')?._count
      ?.id,
  }
}

export const prepareSearchObject = (
  search: string,
  selectedColumn: string[]
) => {
  const searchMapper = {
    Subject: {
      subject: { contains: search },
    },
    'Client name': {
      CmContact: {
        AND: {
          OR: [
            { Fname: { contains: search } },
            { Lname: { contains: search } },
          ],
        },
      },
    },
    'Client email': {
      CmContact: { Email: { contains: search } },
    },
    'Client phone': {
      CmContact: { Phone: { contains: search } },
    },
    'Lead name': {
      CmLead: {
        AND: {
          OR: [
            { Fname: { contains: search } },
            { Lname: { contains: search } },
          ],
        },
      },
    },
    'Assigned to user': {
      AssignedUser: { full_name: { contains: search } },
    },
    Note: {
      note: { contains: search },
    },
    Status: {
      status: { contains: search },
    },
    'Lead description': {
      CmLead: { Description: { contains: search } },
    },
    Creator: {
      User: { full_name: { contains: search } },
    },
    Type: {
      ActivityType: { name: { contains: search } },
    },
    'Lead source': {
      CmLead: { MarketingSource: { name: { contains: search } } },
    },
    'Lead owner': {
      CmLead: { User: { full_name: { contains: search } } },
    },
    'Lead email': {
      CmLead: { Email: { contains: search } },
    },
    'Lead stage': {
      CmLead: { LeadStatusData: { status_name: { contains: search } } },
    },
    'Client street': {
      CmContact: { MailingStreet: { contains: search } },
    },
    'Client city': {
      CmContact: { MailingCity: { contains: search } },
    },
    'Client postcode': {
      CmContact: { MailingPostal: { contains: search } },
    },
    'Lead lost reason': {
      CmLead: {
        LeadStatusData: {
          status_name: { contains: search },
        },
      },
    },
    'Client mobile': {
      CmContact: { Mobile: { contains: search } },
    },
    'Client source': {
      CmContact: {
        MarketingSourceData: {
          name: { contains: search },
        },
      },
    },
    'Client salutation': {
      CmContact: { Salutation: { contains: search } },
    },
    'Client gender': {
      CmContact: { gender: { contains: search } },
    },
  }
  return selectedColumn
    .map((item) => {
      if (searchMapper[item]) {
        return searchMapper[item]
      }
      return null
    })
    .filter((item) => item)
}

export const prepareSortingObject = (sortOrder: string, field: string) => {
  const sortMapper = {
    'Due date': {
      due_start_date: sortOrder,
    },
    Subject: {
      subject: sortOrder,
    },
    'Client name': {
      CmContact: { Fname: sortOrder },
    },
    'Client email': {
      CmContact: { Email: sortOrder },
    },
    'Client phone': {
      CmContact: { Phone: sortOrder },
    },
    'Lead name': {
      CmLead: { Fname: sortOrder },
    },
    'Lead stage': {
      CmLead: { LeadStatusData: { status_name: sortOrder } },
    },
    'Assigned to user': {
      AssignedUser: { full_name: sortOrder },
    },
    Note: {
      note: sortOrder,
    },
    Status: {
      status: sortOrder,
    },
    'Lead description': {
      CmLead: { Description: sortOrder },
    },
    Creator: {
      User: { full_name: sortOrder },
    },
    Type: {
      ActivityType: { name: sortOrder },
    },
    'Lead source': {
      CmLead: { MarketingSource: { name: sortOrder } },
    },
    'Lead owner': {
      CmLead: { User: { full_name: sortOrder } },
    },
    'Lead email': {
      CmLead: { Email: sortOrder },
    },
    'Client street': {
      CmContact: { MailingStreet: sortOrder },
    },
    'Client city': {
      CmContact: { MailingCity: sortOrder },
    },
    'Client postcode': {
      CmContact: { MailingPostal: sortOrder },
    },
    'Free/busy': {
      available: sortOrder === 'asc' ? 'desc' : 'asc',
    },
    'Lead phone': {
      CmLead: { Phone: sortOrder },
    },
    'Add time': {
      created_at: sortOrder,
    },
    'Lead created date': {
      CmLead: { CreatedDate: sortOrder },
    },
    'Won time': {
      CmLead: { ConvertDate: sortOrder },
    },
    'Lead lost reason': {
      CmLead: {
        LeadStatusData: {
          status_name: sortOrder,
        },
      },
    },
    'Lead total activities': {
      CmLead: {
        Activity: {
          count: sortOrder,
        },
      },
    },
    'Client total activities': {
      CmContact: {
        Activity: {
          count: sortOrder,
        },
      },
    },
    'Client mobile': {
      CmContact: { Mobile: sortOrder },
    },
    'Client created date': {
      CmContact: { CreatedDate: sortOrder },
    },
    'Client source': {
      CmContact: {
        MarketingSourceData: {
          name: sortOrder,
        },
      },
    },
    'Client salutation': {
      CmContact: { Salutation: sortOrder },
    },
    'Client gender': {
      CmContact: { gender: sortOrder },
    },
    'Client ID': {
      CmContact: { ID: sortOrder },
    },
    'Client DOB': {
      CmContact: { DOB: sortOrder },
    },
    'Client status': {
      CmContact: { is_active: sortOrder === 'asc' ? 'desc' : 'asc' },
    },
  }
  return sortMapper[field]
}

export const calculateLeadLostObject = (
  leadStatus: string,
  leadNote: LeadNoteType[]
): LeadResponse => {
  const noteData = {}
  if (leadStatus === 'Junk') {
    const note = leadNote.find((item) => {
      if (item.Note.includes('Reason for Junk:')) {
        return item
      }
      return undefined
    })
    noteData['lostReason'] = note?.Note?.split('Reason for Junk:')?.[1]
    noteData['lostTime'] = note?.CreatedDate
  }
  return noteData
}