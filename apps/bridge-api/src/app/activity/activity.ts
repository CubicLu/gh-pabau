import { Context } from '../../context'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { getColumnData } from './filterColumn'
import { cm_leads_EnumStatus } from '@prisma/client'
import UserGroupService from '../user/usergroup.service'
import {
  LeadNoteType,
  LeadResponse,
  ActivityFilterOptionType,
  ActivityResponseType,
  ActivityData,
} from './types'
dayjs.extend(utc)
dayjs.extend(quarterOfYear)

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
      Company: {
        id: { equals: ctx.authenticated.company },
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
    reopened: graphQuery?.find((item) => item.status === 'reopened')?._count
      ?.id,
    awaiting: graphQuery?.find((item) => item.status === 'awaiting')?._count
      ?.id,
    done: graphQuery?.find((item) => item.status === 'done')?._count?.id,
    pending: graphQuery?.find((item) => item.status === 'pending')?._count?.id,
    working: graphQuery?.find((item) => item.status === 'working_on')?._count
      ?.id,
  }
}

export const retrieveActivityData = async (
  where,
  ctx,
  skip,
  take,
  andQuery,
  orQuery,
  prepareSearchQuery,
  prepareOrderQuery,
  activitySelect
) => {
  return ctx.prisma.activity.findMany({
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
      Company: {
        id: { equals: ctx.authenticated.company },
      },
      AND: [
        ...andQuery,
        {
          OR: orQuery,
        },
        {
          OR: prepareSearchQuery,
        },
      ],
    },
    skip: skip,
    take: take,
    orderBy: prepareOrderQuery,
    select: {
      ...activitySelect.select,
      CmContact: {
        select: {
          ...activitySelect.select?.CmContact?.select,
          Activity: {
            select: {
              id: true,
              status: true,
              finished_at: true,
            },
          },
        },
      },
      CmLead: {
        select: {
          ...activitySelect.select?.CmLead?.select,
          ID: true,
          LastUpdated: true,
          Contact: {
            select: {
              OwnerID: true,
            },
          },
          CmLeadNote: {
            select: {
              ID: true,
              Note: true,
              CreatedDate: true,
            },
          },
          Activity: {
            select: {
              id: true,
              status: true,
              finished_at: true,
              due_start_date: true,
            },
          },
          EnumStatus: true,
          LeadStatusData: {
            select: {
              status_name: true,
              is_convert: true,
            },
          },
          CommunicationRecipient: {
            select: {
              Communication: {
                select: {
                  date: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

const leadStatusMapper = (search: string) => {
  const value = search?.split('%')?.[1]
  const statusMap = {
    open: cm_leads_EnumStatus.Open,
    won: cm_leads_EnumStatus.Converted,
    lost: cm_leads_EnumStatus.Junk,
  }
  return (
    statusMap[value?.toLowerCase()] && {
      equals: statusMap[value?.toLowerCase()],
    }
  )
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
    'Lead status': {
      CmLead: { EnumStatus: leadStatusMapper(search) },
    },
    Address: {
      CmContact: { MailingStreet: { contains: search } },
    },
    'City/Town': {
      CmContact: { MailingCity: { contains: search } },
    },
    'Post Code': {
      CmContact: { MailingPostal: { contains: search } },
    },
    Country: {
      CmContact: { MailingCountry: { contains: search } },
    },
    'Lead lost reason': {
      CmLead: {
        LeadStatusData: {
          status_name: { contains: search },
        },
      },
    },
    'Lead location': {
      CmLead: {
        Location: {
          name: { contains: search },
        },
      },
    },
    Title: {
      CmLead: {
        AND: {
          OR: [
            { Fname: { contains: search } },
            { Lname: { contains: search } },
          ],
        },
      },
    },
    Pipeline: {
      CmLead: {
        PipelineStage: {
          Pipeline: {
            name: { contains: search },
          },
        },
      },
    },
    'Lead creator': {
      CmLead: {
        Contact: {
          User: {
            full_name: { contains: search },
          },
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
    'Lead status': {
      CmLead: { EnumStatus: sortOrder },
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
    Address: {
      CmContact: { MailingStreet: sortOrder },
    },
    'City/Town': {
      CmContact: { MailingCity: sortOrder },
    },
    'Post Code': {
      CmContact: { MailingPostal: sortOrder },
    },
    Country: {
      CmContact: { MailingCountry: sortOrder },
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
    'Lead location': {
      CmLead: {
        Location: {
          name: sortOrder,
        },
      },
    },
    Title: {
      CmLead: { Fname: sortOrder },
    },
    'Update time': {
      CmLead: { LastUpdate: sortOrder },
    },
    Pipeline: {
      CmLead: {
        PipelineStage: {
          Pipeline: {
            name: sortOrder,
          },
        },
      },
    },
    'Date of entering stage': {
      CmLead: {
        ConvertDate: sortOrder,
      },
    },
    'Lead creator': {
      CmLead: {
        Contact: {
          User: {
            full_name: sortOrder,
          },
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

const calculateLeadLostObject = (
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
    noteData['id'] = note?.ID
  }
  return noteData
}

const retrieveDateMapper = () => {
  return {
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
}

const prepareDateQuery = (menu: string | number, operand: string) => {
  const dateMapper = retrieveDateMapper()
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
    const userGroup = new UserGroupService(ctx)
    const ids = await userGroup.retrieveUserGroupMembers(value)
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
    queryValue = value === '1' ? true : false
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

export const prepareOperandQuery = async (
  column: string,
  menu: string,
  operand: string,
  ctx: Context
) => {
  const data = getColumnData(column)
  let operandQuery
  switch (data?.key) {
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
    default: {
      return undefined
      break
    }
  }
  return operandQuery
}

const bindQueryIntoModelVariable = (column: string, data) => {
  return getColumnData(column, data)?.filter
}

export const prepareFilterQuery = async (
  items: ActivityFilterOptionType[],
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

const manualFilterOnBasicOperand = (
  columnValue: ActivityFilterOptionType,
  value: number | string,
  type = 'number'
) => {
  const inputValue =
    type === 'number' ? Number(columnValue.menuOption) : columnValue.menuOption
  switch (columnValue.operand) {
    case 'is': {
      if (value === inputValue) {
        return true
      }
      break
    }
    case 'is not': {
      if (value !== inputValue) {
        return true
      }
      break
    }
    case 'is empty': {
      if (!value) {
        return true
      }
      break
    }
    case 'is not empty': {
      if (value) {
        return true
      }
      break
    }
  }
}

const manualFilterOnDoneColumn = (
  columnValue: ActivityFilterOptionType,
  value: string
) => {
  const inputValue =
    columnValue.menuOption === 'Done'
      ? ['Done']
      : ['Pending', 'Working on', 'Reopened', 'Awaiting']
  switch (columnValue.operand) {
    case 'is': {
      if (inputValue.includes(value)) {
        return true
      }
      break
    }
    case 'is not': {
      if (!inputValue.includes(value)) {
        return true
      }
      break
    }
    case 'is empty': {
      if (!value) {
        return true
      }
      break
    }
    case 'is not empty': {
      if (value) {
        return true
      }
      break
    }
  }
}

const manualFilterOnDateOperand = (
  columnValue: ActivityFilterOptionType,
  value: Date
) => {
  const dateMapper = retrieveDateMapper()
  const date = dateMapper[columnValue.menuOption]
  switch (columnValue.operand) {
    case 'is': {
      if (value >= date[0] && value <= date[1]) {
        return true
      }
      break
    }
    case 'is not': {
      if (!(value >= date[0] && value <= date[1])) {
        return true
      }
      break
    }
    case 'is later than': {
      if (value > date[1]) {
        return true
      }
      break
    }
    case 'is earlier than': {
      if (value < date[0]) {
        return true
      }
      break
    }
    case 'is exactly or later than': {
      if (value >= date[0]) {
        return true
      }
      break
    }
    case 'is exactly or earlier than': {
      if (value <= date[1]) {
        return true
      }
      break
    }
    case 'is empty': {
      if (!value) {
        return true
      }
      break
    }
    case 'is not empty': {
      if (value) {
        return true
      }
      break
    }
  }
}

const manualFilterOnStringOperand = (
  columnValue: ActivityFilterOptionType,
  value: string
) => {
  const data = columnValue?.menuOption?.toLowerCase()
  value = value?.toLowerCase()
  switch (columnValue.operand) {
    case 'is': {
      if (value === data) {
        return true
      }
      break
    }
    case 'is not': {
      if (value !== data) {
        return true
      }
      break
    }
    case 'is empty': {
      if (!value) {
        return true
      }
      break
    }
    case 'is not empty': {
      if (value) {
        return true
      }
      break
    }
    case 'contains': {
      if (value?.includes(data)) {
        return true
      }
      break
    }
    case 'does not contain': {
      if (!value?.includes(data)) {
        return true
      }
      break
    }
    case 'start with': {
      if (value?.startsWith(data)) {
        return true
      }
      break
    }
    case 'does not start with': {
      if (!value?.startsWith(data)) {
        return true
      }
      break
    }
    case 'ends with': {
      if (value?.endsWith(data)) {
        return true
      }
      break
    }
    case 'does not end with': {
      if (!value?.endsWith(data)) {
        return true
      }
      break
    }
  }
}

const manualFilterOnNumberOperand = (
  columnValue: ActivityFilterOptionType,
  value: number
) => {
  switch (columnValue.operand) {
    case 'is': {
      if (value === Number(columnValue.menuOption)) {
        return true
      }
      break
    }
    case 'is not': {
      if (value !== Number(columnValue.menuOption)) {
        return true
      }
      break
    }
    case 'is empty': {
      if (!value) {
        return true
      }
      break
    }
    case 'is not empty': {
      if (value) {
        return true
      }
      break
    }
    case 'is more than': {
      if (value > Number(columnValue.menuOption)) {
        return true
      }
      break
    }
    case 'is less than': {
      if (value < Number(columnValue.menuOption)) {
        return true
      }
      break
    }
    case 'is more or equal to': {
      if (value >= Number(columnValue.menuOption)) {
        return true
      }
      break
    }
    case 'is less or equal to': {
      if (value <= Number(columnValue.menuOption)) {
        return true
      }
      break
    }
  }
}

const manualFilterOnUserOperand = async (
  columnValue: ActivityFilterOptionType,
  value: number,
  ctx: Context
) => {
  const data = Number(columnValue.menuOption)
  switch (columnValue.operand) {
    case 'is': {
      if (value === data) {
        return true
      }
      break
    }
    case 'is not': {
      if (value !== data) {
        return true
      }
      break
    }
    case 'is empty': {
      if (!value) {
        return true
      }
      break
    }
    case 'is not empty': {
      if (value) {
        return true
      }
      break
    }
    case 'belongs to team': {
      const userGroup = new UserGroupService(ctx)
      const ids = await userGroup.retrieveUserGroupMembers(data)
      if (ids.includes(value)) {
        return true
      }
      break
    }
  }
}

export const prepareActivityDataWithCustomField = async (
  ctx: Context,
  activityData: ActivityData[]
): Promise<ActivityResponseType[]> => {
  return await Promise.all(
    activityData.map(async (item: ActivityData) => {
      const leadAllActivity = item?.CmLead?.Activity ?? []
      const contactAllActivity = item?.CmContact?.Activity ?? []
      const leadNote = item?.CmLead?.CmLeadNote

      leadAllActivity?.sort((a, b) => {
        return (
          new Date(a.finished_at).getTime() - new Date(b.finished_at).getTime()
        )
      })

      leadNote?.sort((a, b) => {
        return (
          new Date(b.CreatedDate).getTime() - new Date(a.CreatedDate).getTime()
        )
      })

      const leadEmailReceived = item?.CmLead?.CommunicationRecipient.map(
        (item) => {
          if (item?.Communication?.date) {
            return item?.Communication?.date
          }
          return undefined
        }
      ).filter((item) => item)

      const leadLastEmailReceived = leadEmailReceived?.sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime()
      })?.[0]

      const leadLost = calculateLeadLostObject(
        item.CmLead?.EnumStatus,
        leadNote
      )
      // In future we will add this field on db level

      // const lastEmailSend = await ctx.prisma.communication.findFirst({
      //   where: {
      //     from_address: { equals: item.CmLead?.Email },
      //     company_id: { equals: ctx.authenticated.company },
      //   },
      //   orderBy: {
      //     date: 'desc',
      //   },
      // })
      const leadLastActivityDate = [...leadAllActivity]
        .reverse()
        .find((item) => item?.status === 'done')?.finished_at
      return {
        ...item,
        duration: dayjs(item.due_end_date).diff(
          dayjs(item.due_start_date),
          'minutes'
        ),
        CmLead: {
          ...item.CmLead,
          leadDoneActivities: leadAllActivity.filter(
            (item) => item?.status === 'done'
          )?.length,
          firstActivityTime: leadAllActivity.find(
            (item) => item?.status === 'done'
          )?.finished_at,
          leadLastActivityDate: leadLastActivityDate,
          leadLastActivityDays:
            leadLastActivityDate && dayjs().diff(leadLastActivityDate, 'days'),
          leadTotalActivities: leadAllActivity.length,
          leadActivitesToDo: leadAllActivity.filter(
            (item) => item?.status !== 'done'
          )?.length,
          leadNextActivityDate: leadAllActivity.find(
            (item) => item?.status !== 'done'
          )?.due_start_date,
          leadLastEmailReceived: leadLastEmailReceived,
          emailMessagesCount: item?.CmLead?.CommunicationRecipient?.length,
          leadLastEmailSend: dayjs().utc(),
          wonBy:
            item.CmLead?.EnumStatus === 'Converted'
              ? {
                  full_name: item.CmLead?.User?.full_name,
                  image: item.CmLead?.User?.image,
                }
              : null,
          wonTime:
            item.CmLead?.EnumStatus === 'Converted'
              ? item.CmLead?.ConvertDate
              : null,
          leadLost: {
            id: leadLost?.id,
            reason: leadLost?.lostReason,
            time: leadLost?.lostTime,
          },
          leadStage: item.CmLead?.LeadStatusData?.status_name,
        },
        CmContact: {
          ...item.CmContact,
          clientTotalActivities: contactAllActivity.length,
        },
      }
    })
  )
}

export const manualFilterOnAndOperandColumns = (
  activities: ActivityResponseType[],
  availableCustomColumns: ActivityFilterOptionType[]
) => {
  return activities
    .map((item) => {
      let count = 0
      for (const columnValue of availableCustomColumns) {
        switch (columnValue.filterColumn) {
          case 'Lead done activities': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadDoneActivities
              )
            ) {
              count += 1
            }
            break
          }
          case 'First activity time': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.firstActivityTime
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead last activity date': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadLastActivityDate
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead last activity (days)': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadDoneActivities
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead lost reason': {
            if (
              manualFilterOnStringOperand(
                columnValue,
                item?.CmLead?.leadLost?.reason
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead total activities': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadTotalActivities
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead lost time': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadLost?.time
              )
            ) {
              count += 1
            }
            break
          }
          case 'Activities to do': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadActivitesToDo
              )
            ) {
              count += 1
            }
            break
          }
          case 'Email messages count': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.emailMessagesCount
              )
            ) {
              count += 1
            }
            break
          }
          case 'Last email received': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadLastEmailReceived
              )
            ) {
              count += 1
            }
            break
          }
          // case 'Last email sent': {
          //   if (
          //     manualFilterOnDateOperand(
          //       columnValue,
          //       item?.CmLead?.leadLastEmailSend
          //     )
          //   ) {
          //     count += 1
          //   }
          //   break
          // }
          case 'Next activity date': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadNextActivityDate
              )
            ) {
              count += 1
            }
            break
          }
        }
      }
      if (count === availableCustomColumns.length) {
        return item
      }
      return undefined
    })
    .filter((item) => item)
}

export const manualFilterOnOrOperandColumns = async (
  activities: ActivityResponseType[],
  filters: ActivityFilterOptionType[],
  ctx: Context
) => {
  const data = await Promise.all(
    activities.map(async (item) => {
      let count = 0
      for (const columnValue of filters) {
        switch (columnValue.filterColumn) {
          case 'Add time': {
            if (manualFilterOnDateOperand(columnValue, item?.created_at)) {
              count += 1
            }
            break
          }
          case 'Assigned to user': {
            if (
              manualFilterOnUserOperand(columnValue, item?.assigned_to, ctx)
            ) {
              count += 1
            }
            break
          }
          case 'Client name': {
            if (manualFilterOnBasicOperand(columnValue, item?.contact_id)) {
              count += 1
            }
            break
          }
          case 'Creator': {
            if (manualFilterOnUserOperand(columnValue, item?.User?.id, ctx)) {
              count += 1
            }
            break
          }
          case 'Done': {
            if (manualFilterOnDoneColumn(columnValue, item?.status)) {
              count += 1
            }
            break
          }
          case 'Type': {
            if (manualFilterOnBasicOperand(columnValue, item?.type)) {
              count += 1
            }
            break
          }
          case 'Subject': {
            if (manualFilterOnStringOperand(columnValue, item?.subject)) {
              count += 1
            }
            break
          }
          case 'Due date': {
            if (manualFilterOnDateOperand(columnValue, item?.due_start_date)) {
              count += 1
            }
            break
          }
          case 'Free/busy': {
            if (
              manualFilterOnBasicOperand(
                columnValue,
                item?.available ? '1' : '0'
              )
            ) {
              count += 1
            }
            break
          }
          case 'Status': {
            if (manualFilterOnBasicOperand(columnValue, item?.status)) {
              count += 1
            }
            break
          }
          case 'Lead name': {
            if (manualFilterOnBasicOperand(columnValue, item?.CmLead?.ID)) {
              count += 1
            }
            break
          }
          case 'Lead email': {
            if (manualFilterOnStringOperand(columnValue, item?.CmLead?.Email)) {
              count += 1
            }
            break
          }
          case 'Lead phone': {
            if (manualFilterOnStringOperand(columnValue, item?.CmLead?.Phone)) {
              count += 1
            }
            break
          }
          case 'Lead created date': {
            if (
              manualFilterOnDateOperand(columnValue, item?.CmLead?.CreatedDate)
            ) {
              count += 1
            }
            break
          }
          case 'Won time': {
            if (
              item?.CmLead?.EnumStatus === 'Converted' &&
              manualFilterOnDateOperand(columnValue, item?.CmLead?.CreatedDate)
            ) {
              count += 1
            }
            break
          }
          case 'Lead owner': {
            if (
              await manualFilterOnUserOperand(
                columnValue,
                item?.CmLead?.OwnerID,
                ctx
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead closed on': {
            if (
              manualFilterOnDateOperand(columnValue, item?.CmLead?.ConvertDate)
            ) {
              count += 1
            }
            break
          }
          case 'Lead done activities': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadDoneActivities
              )
            ) {
              count += 1
            }
            break
          }
          case 'First activity time': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.firstActivityTime
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead last activity date': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadLastActivityDate
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead last activity (days)': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadDoneActivities
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead lost reason': {
            if (
              manualFilterOnStringOperand(
                columnValue,
                item?.CmLead?.leadLost?.reason
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead total activities': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadTotalActivities
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead lost time': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadLost?.time
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead source': {
            if (
              manualFilterOnBasicOperand(
                columnValue,
                item?.CmLead?.MarketingSource?.id
              )
            ) {
              count += 1
            }
            break
          }
          case 'Won by': {
            if (
              item?.CmLead?.EnumStatus === 'Converted' &&
              (await manualFilterOnUserOperand(
                columnValue,
                item?.CmLead?.User?.id,
                ctx
              ))
            ) {
              count += 1
            }
            break
          }
          case 'Lead stage': {
            if (
              manualFilterOnBasicOperand(
                columnValue,
                item?.CmLead?.LeadStatusData?.id
              )
            ) {
              count += 1
            }
            break
          }
          // case 'Lead descriptions': {
          //   if (
          //     manualFilterOnStringOperand(
          //       columnValue,
          //       item?.CmLead?.Description
          //     )
          //   ) {
          //     count += 1
          //   }
          //   break
          // }
          case 'Lead status': {
            if (
              manualFilterOnBasicOperand(
                columnValue,
                item?.CmLead?.EnumStatus,
                'string'
              )
            ) {
              count += 1
            }
            break
          }
          case 'Activities to do': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.leadActivitesToDo
              )
            ) {
              count += 1
            }
            break
          }
          case 'Lead creator': {
            if (
              await manualFilterOnUserOperand(
                columnValue,
                item?.CmLead?.Contact?.OwnerID,
                ctx
              )
            ) {
              count += 1
            }
            break
          }
          case 'Date of entering stage': {
            if (
              manualFilterOnDateOperand(columnValue, item?.CmLead?.ConvertDate)
            ) {
              count += 1
            }
            break
          }
          case 'Email messages count': {
            if (
              manualFilterOnNumberOperand(
                columnValue,
                item?.CmLead?.emailMessagesCount
              )
            ) {
              count += 1
            }
            break
          }
          case 'Last email received': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadLastEmailReceived
              )
            ) {
              count += 1
            }
            break
          }
          // case 'Last email sent': {
          //   if (
          //     manualFilterOnDateOperand(
          //       columnValue,
          //       item?.CmLead?.leadLastEmailSend
          //     )
          //   ) {
          //     count += 1
          //   }
          //   break
          // }
          case 'Next activity date': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                item?.CmLead?.leadNextActivityDate
              )
            ) {
              count += 1
            }
            break
          }
          case 'Pipeline': {
            if (
              manualFilterOnBasicOperand(
                columnValue,
                item?.CmLead?.PipelineStage?.pipeline_id
              )
            ) {
              count += 1
            }
            break
          }
          case 'Title': {
            if (manualFilterOnBasicOperand(columnValue, item?.CmLead?.ID)) {
              count += 1
            }
            break
          }
          case 'Update time': {
            if (
              manualFilterOnDateOperand(
                columnValue,
                new Date(item?.CmLead?.LastUpdated)
              )
            ) {
              count += 1
            }
            break
          }
          case 'Location': {
            if (
              manualFilterOnBasicOperand(columnValue, item?.CmLead?.location_id)
            ) {
              count += 1
            }
            break
          }
        }
      }
      if (count > 0) {
        return item
      }
    })
  )
  return data?.filter((item) => item)
}
