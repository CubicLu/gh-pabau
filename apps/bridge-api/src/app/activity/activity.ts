import { Context } from '../../context'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { LeadNoteType, LeadResponse, FilterOptionType } from './types'
dayjs.extend(utc)
dayjs.extend(quarterOfYear)

const manageOperandBasedOnColumn = {
  'Add time': {
    key: 'Date',
    type: 'string',
  },
  'Assigned to user': {
    key: 'User',
    type: 'string',
  },
  'Client name': {
    key: 'Basic',
    type: 'number',
  },
  Creator: {
    key: 'User',
    type: 'string',
  },
  'Lead name': {
    key: 'Basic',
    type: 'number',
  },
  Done: {
    key: 'Done',
    type: 'string',
  },
  Type: {
    key: 'Basic',
    type: 'number',
  },
  Subject: {
    key: 'Name',
    type: 'string',
  },
  'Due date': {
    key: 'Date',
    type: 'string',
  },
  'Free/busy': {
    key: 'Basic',
    type: 'boolean',
  },
  Status: {
    key: 'Basic',
    type: 'string',
  },
}

export const retrieveActivityGraphData = async (
  ctx: Context,
  where,
  searchQuery,
  andQuery,
  orQuery
) => {
  const graphQuery = await ctx.prisma.activity.groupBy({
    by: ['status'],
    where: {
      due_start_date: {
        gte: where?.startDate,
        lte: where?.endDate,
      },
      ActivityType: { name: { in: where?.activityType } },
      status: { in: where?.status },
      AssignedUser: {
        id: { in: where?.userId },
      },
      AND: [
        ...andQuery,
        {
          OR: orQuery,
        },
        {
          OR: searchQuery,
        },
      ],
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

const prepareDateQuery = (menu: string | number, operand: string) => {
  const dateMapper = {
    'last quarter': [
      dayjs().utc().add(-1, 'quarter').startOf('quarter').format(),
      dayjs().utc().add(-1, 'quarter').endOf('quarter').format(),
    ],
    'this quarter': [
      dayjs().utc().startOf('quarter').format(),
      dayjs().utc().endOf('quarter').format(),
    ],
    'last month': [
      dayjs().utc().subtract(1, 'month').startOf('month').format(),
      dayjs().utc().subtract(1, 'month').endOf('month').format(),
    ],
    'this month': [
      dayjs().utc().startOf('month').format(),
      dayjs().utc().endOf('month').format(),
    ],
    'last week': [
      dayjs().utc().subtract(1, 'week').day(1).format(),
      dayjs().utc().subtract(1, 'week').day(7).format(),
    ],
    'this week': [dayjs().utc().day(1).format(), dayjs().utc().day(7).format()],
    'next week': [
      dayjs().utc().add(1, 'week').day(1).format(),
      dayjs().utc().add(1, 'week').day(7).format(),
    ],
    'next month': [
      dayjs().utc().add(1, 'month').startOf('month').format(),
      dayjs().utc().add(1, 'month').endOf('month').format(),
    ],
    '6 months ago': [
      dayjs().utc().subtract(6, 'month').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '5 months ago': [
      dayjs().utc().subtract(5, 'month').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '4 months ago': [
      dayjs().utc().subtract(4, 'month').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '3 months ago': [
      dayjs().utc().subtract(3, 'month').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '2 months ago': [
      dayjs().utc().subtract(2, 'month').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '1 months ago': [
      dayjs().utc().subtract(1, 'month').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '3 weeks ago': [
      dayjs().utc().subtract(3, 'week').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '2 weeks ago': [
      dayjs().utc().subtract(2, 'week').startOf('day').format(),
      dayjs().utc().format(),
    ],
    '1 weeks ago': [
      dayjs().utc().subtract(1, 'week').startOf('day').format(),
      dayjs().utc().format(),
    ],
    yesterday: [
      dayjs().utc().subtract(1, 'day').startOf('day').format(),
      dayjs().utc().subtract(1, 'day').endOf('day').format(),
    ],
    'before today': [
      undefined,
      dayjs().utc().subtract(1, 'days').endOf('day').format(),
    ],
    today: [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().endOf('day').format(),
    ],
    now: [dayjs().utc().format(), dayjs().utc().format()],
    'today or later': [dayjs().utc().startOf('day').format(), undefined],
    'before tomorrow': [undefined, dayjs().utc().endOf('day').format()],
    tomorrow: [
      dayjs().utc().add(1, 'day').startOf('day').format(),
      dayjs().utc().add(1, 'day').endOf('day').format(),
    ],
    'tomorrow or later': [
      dayjs().utc().add(1, 'day').startOf('day').format(),
      undefined,
    ],
    'in 1 week': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(1, 'week').endOf('day').format(),
    ],
    'in 2 weeks': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(2, 'week').endOf('day').format(),
    ],
    'in 3 weeks': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(3, 'week').endOf('day').format(),
    ],
    'in 1 month': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(1, 'month').endOf('day').format(),
    ],
    'in 2 months': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(2, 'month').endOf('day').format(),
    ],
    'in 3 months': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(3, 'month').endOf('day').format(),
    ],
    'in 4 months': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(4, 'month').endOf('day').format(),
    ],
    'in 5 months': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(5, 'month').endOf('day').format(),
    ],
    'in 6 months': [
      dayjs().utc().startOf('day').format(),
      dayjs().utc().add(6, 'month').endOf('day').format(),
    ],
  }
  const operandMapper = {
    is: {
      gte: dateMapper[menu][0],
      lte: dateMapper[menu][1],
    },
    'is not': {
      not: {
        gte: dateMapper[menu][0],
        lte: dateMapper[menu][1],
      },
    },
    'is later than': {
      gt: dateMapper[menu][1],
    },
    'is earlier than': {
      lt: dateMapper[menu][0],
    },
    'is exactly or later than': {
      gte: dateMapper[menu][0],
    },
    'is exactly or earlier than': {
      lte: dateMapper[menu][1],
    },
    'is empty': {
      equals: null,
    },
    'is not empty': {
      not: { equals: null },
    },
  }
  return operandMapper[operand]
}

const prepareUserQuery = async (
  value: number,
  operand: string,
  ctx: Context
) => {
  const operandMapper = {
    is: {
      equals: value,
    },
    'is not': {
      not: {
        equals: value,
      },
    },
    'is empty': {
      equals: 0,
    },
    'is not empty': {
      not: { equals: 0 },
    },
  }
  if (operand === 'belongs to team') {
    const group = await ctx.prisma.userGroup.findMany({
      where: {
        UserGroupMember: {
          some: {
            user_id: { equals: value },
          },
        },
      },
      select: {
        UserGroupMember: {
          select: {
            user_id: true,
            group_id: true,
          },
        },
      },
    })
    const ids = []
    if (group.length > 0) {
      for (const item of group) {
        for (const member of item?.UserGroupMember) {
          ids.push(member.user_id)
        }
      }
    } else {
      ids.push(value)
    }
    return {
      in: ids,
    }
  }
  return operandMapper[operand]
}

const prepareBasicQuery = (value: string, operand: string, type: string) => {
  let queryValue: string | number | boolean = value
  if (type === 'number') {
    queryValue = Number.parseInt(value)
  } else if (type === 'boolean') {
    queryValue = Boolean(value)
  }
  const operandMapper = {
    is: {
      equals: queryValue,
    },
    'is not': {
      not: {
        equals: queryValue,
      },
    },
    'is empty': {
      equals: type === 'number' ? 0 : type === 'boolean' ? true : '',
    },
    'is not empty': {
      not: { equals: type === 'number' ? 0 : type === 'boolean' ? false : '' },
    },
  }
  return operandMapper[operand]
}

const prepareNameQuery = (value: string, operand: string) => {
  const operandMapper = {
    is: {
      equals: value,
    },
    'is not': {
      not: {
        equals: value,
      },
    },
    'is empty': {
      equals: '',
    },
    'is not empty': {
      not: { equals: '' },
    },
    contains: {
      contains: value,
    },
    'does not contain': {
      not: { contains: value },
    },
    'start with': {
      startsWith: value,
    },
    'does not start with': {
      not: { startsWith: value },
    },
    'ends with': {
      endsWith: value,
    },
    'does not end with': {
      not: { endsWith: value },
    },
  }
  return operandMapper[operand]
}

const prepareDoneQuery = (value: string, operand: string) => {
  const operandMapper = {
    is: {
      in:
        value === 'Done'
          ? [value]
          : ['Pending', 'Working on', 'Reopened', 'Awaiting'],
    },
    'is not': {
      not: {
        in:
          value === 'Done'
            ? [value]
            : ['Pending', 'Working on', 'Reopened', 'Awaiting'],
      },
    },
    'is empty': {
      equals: '',
    },
    'is not empty': {
      not: { equals: '' },
    },
  }
  return operandMapper[operand]
}

const prepareOperandQuery = async (
  column: string,
  menu: string,
  operand: string,
  ctx: Context
) => {
  const data = manageOperandBasedOnColumn[column]
  let operandQuery
  switch (data.key) {
    case 'Date':
      operandQuery = prepareDateQuery(menu, operand)
      break
    case 'User':
      operandQuery = await prepareUserQuery(Number.parseInt(menu), operand, ctx)
      break
    case 'Basic':
      operandQuery = prepareBasicQuery(menu, operand, data.type)
      break
    case 'Name':
      operandQuery = prepareNameQuery(menu, operand)
      break
    case 'Done':
      operandQuery = prepareDoneQuery(menu, operand)
      break
  }
  return operandQuery
}

const bindQueryIntoModelVariable = (column: string, data) => {
  const filterMapper = {
    'Add time': {
      created_at: data,
    },
    'Assigned to user': {
      AssignedUser: { id: data },
    },
    'Client name': {
      CmContact: {
        ID: data,
      },
    },
    Creator: {
      User: { id: data },
    },
    'Lead name': {
      CmLead: {
        ID: data,
      },
    },
    Done: {
      status: data,
    },
    Type: {
      type: data,
    },
    Subject: {
      subject: data,
    },
    'Due date': {
      due_start_date: data,
    },
    'Free/busy': {
      available: data,
    },
    Status: {
      status: data,
    },
  }
  return filterMapper[column]
}
export const prepareFilterQuery = async (
  items: FilterOptionType[],
  ctx: Context
) => {
  const queryObject = []
  for (const item of items) {
    if (
      item.operand !== 'is empty' &&
      item.operand !== 'is not empty' &&
      item.menuOption === ''
    ) {
      continue
    }
    const prepareInnerObject = await prepareOperandQuery(
      item.filterColumn,
      item.menuOption,
      item.operand,
      ctx
    )
    queryObject.push(
      bindQueryIntoModelVariable(item.filterColumn, prepareInnerObject)
    )
  }
  return queryObject
}
