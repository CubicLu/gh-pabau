import { extendType, objectType, inputObjectType, intArg, nonNull } from 'nexus'
import { Context } from '../../../context'
import { PrismaSelect } from '@paljs/plugins'
import dayjs from 'dayjs'
import { ActivityData } from '../types'
import {
  retrieveActivityGraphData,
  prepareSearchObject,
  prepareSortingObject,
  calculateLeadLostObject,
} from '../activity'

export const RetrieveActivityCount = objectType({
  name: 'RetrieveActivityCount',
  definition(t) {
    t.int('reopened')
    t.int('pending')
    t.int('working')
    t.int('awaiting')
    t.int('done')
  },
})

export const CmContactCustomType = objectType({
  name: 'CmContactCustomType',
  definition(t) {
    t.string('Fname')
    t.string('Lname')
    t.nonNull.list.field('CmContactLabel', { type: 'CmContactLabel' })
    t.string('Email')
    t.string('Phone')
    t.string('MailingStreet')
    t.string('MailingCity')
    t.string('MailingPostal')
    t.string('MailingCountry')
    t.int('clientTotalActivities')
    t.string('Mobile')
    t.field('CreatedDate', { type: 'DateTime' })
    t.string('LeadSource')
    t.string('Salutation')
    t.string('gender')
    t.int('ID')
    t.field('DOB', { type: 'DateTime' })
    t.int('is_active')
    t.field('MarketingSourceData', { type: 'MarketingSource' })
  },
})

export const CmLeadCustomType = objectType({
  name: 'CmLeadCustomType',
  definition(t) {
    t.string('Fname')
    t.string('Lname')
    t.string('Email')
    t.string('Phone')
    t.string('Description')
    t.field('User', { type: 'User' })
    t.field('ConvertDate', { type: 'DateTime' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('leadDoneActivities')
    t.field('firstActivityTime', { type: 'DateTime' })
    t.field('leadLastActivityDate', { type: 'DateTime' })
    t.int('leadLastActivityDays')
    t.int('leadTotalActivities')
    t.string('leadLostReason')
    t.field('leadLostTime', { type: 'DateTime' })
    t.string('wonBy')
    t.field('MarketingSource', { type: 'MarketingSource' })
    t.string('leadStage')
  },
})

export const ActivityCustomType = objectType({
  name: 'ActivityCustomType',
  definition(t) {
    t.nonNull.int('id')
    t.field('due_start_date', { type: 'DateTime' })
    t.field('due_end_date', { type: 'DateTime' })
    t.int('lead_id')
    t.field('ActivityType', { type: 'ActivityType' })
    t.string('subject')
    t.string('note')
    t.string('status')
    t.boolean('available')
    t.field('AssignedUser', { type: 'User' })
    t.field('created_at', { type: 'DateTime' })
    t.field('finished_at', { type: 'DateTime' })
    t.int('duration')
    t.field('User', { type: 'User' })
    t.field('CmContact', { type: 'CmContactCustomType' })
    t.field('CmLead', { type: 'CmLeadCustomType' })
  },
})

export const ActivityResponse = objectType({
  name: 'ActivityResponse',
  definition(t) {
    t.nonNull.field('retrieveActivityCount', { type: 'RetrieveActivityCount' })
    t.nonNull.int('count')
    t.nonNull.list.field('activityData', {
      type: nonNull('ActivityCustomType'),
    })
  },
})

export const OrderType = inputObjectType({
  name: 'OrderType',
  definition(t) {
    t.string('field')
    t.string('order')
  },
})

export const ActivityWhereInputType = inputObjectType({
  name: 'ActivityWhereInputType',
  definition(t) {
    t.field('startDate', { type: 'DateTime' })
    t.field('endDate', { type: 'DateTime' })
    t.list.field('activityType', { type: 'String' })
    t.list.field('status', { type: 'String' })
    t.list.field('userId', { type: 'Int' })
    t.string('search')
    t.list.string('activeColumns')
    t.field('orderValue', { type: 'OrderType' })
  },
})

const customFields = [
  'leadDoneActivities',
  'firstActivityTime',
  'leadLastActivityDate',
  'leadLastActivityDays',
  'leadTotalActivities',
  'leadLostTime',
  'wonBy',
  'leadLostReason',
  'leadStage',
]

export const ActivityQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyActivityData', {
      type: 'ActivityResponse',
      description:
        'Retrieve total count of activity, activity record and activity graph data based on status and activity types',
      args: {
        where: 'ActivityWhereInputType',
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, input, ctx: Context, info) {
        const select = new PrismaSelect(info).value
        const activitySelect = { ...select.select?.activityData }

        for (const key of customFields) {
          if (activitySelect?.select?.CmLead?.select?.[key]) {
            delete activitySelect?.select?.CmLead?.select?.[key]
          }
        }
        delete activitySelect?.select?.CmContact?.select?.clientTotalActivities
        delete activitySelect?.select?.duration

        input.where = Object.entries(input.where).reduce(
          (acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }
            return acc
          },
          {}
        )

        try {
          const prepareSearchQuery =
            input.where?.search &&
            prepareSearchObject(input.where?.search, input.where?.activeColumns)
          const prepareOrderQuery = prepareSortingObject(
            input.where?.orderValue?.order,
            input.where?.orderValue?.field
          )
          const graphData = await retrieveActivityGraphData(
            ctx,
            input,
            prepareSearchQuery
          )
          const activityData = await ctx.prisma.activity.findMany({
            where: {
              due_start_date: {
                gte: input.where?.startDate,
                lte: input.where?.endDate,
              },
              ActivityType: { name: { in: input.where?.activityType } },
              status: { in: input.where?.status },
              AssignedUser: {
                id: { in: input.where?.userId },
              },
              AND: {
                OR: prepareSearchQuery,
              },
            },
            skip: input?.skip ?? 0,
            take: input?.take ?? 50,
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
                  CmLeadNote: {
                    select: {
                      Note: true,
                      CreatedDate: true,
                    },
                  },
                  Activity: {
                    select: {
                      id: true,
                      status: true,
                      finished_at: true,
                    },
                  },
                  EnumStatus: true,
                  LeadStatusData: {
                    select: {
                      status_name: true,
                      is_convert: true,
                    },
                  },
                },
              },
            },
          })

          const finalActivityRespons = activityData.map(
            (item: ActivityData) => {
              const leadAllActivity = item?.CmLead?.Activity ?? []
              const contactAllActivity = item?.CmContact?.Activity ?? []
              const leadNote = item?.CmLead?.CmLeadNote

              leadAllActivity.sort((a, b) => {
                return (
                  new Date(a.finished_at).getTime() -
                  new Date(b.finished_at).getTime()
                )
              })

              leadNote.sort((a, b) => {
                return (
                  new Date(b.CreatedDate).getTime() -
                  new Date(a.CreatedDate).getTime()
                )
              })

              const leadLost = calculateLeadLostObject(
                item.CmLead?.EnumStatus,
                leadNote
              )
              const leadLastActivityDate = [...leadAllActivity]
                .reverse()
                .find((item) => item?.status === 'Done')?.finished_at
              return {
                ...item,
                duration: dayjs(item.due_end_date).diff(
                  dayjs(item.due_start_date),
                  'minutes'
                ),
                CmLead: {
                  ...item.CmLead,
                  leadDoneActivities: leadAllActivity.filter(
                    (item) => item?.status === 'Done'
                  )?.length,
                  firstActivityTime: leadAllActivity.find(
                    (item) => item?.status === 'Done'
                  )?.finished_at,
                  leadLastActivityDate: leadLastActivityDate,
                  leadLastActivityDays:
                    leadLastActivityDate &&
                    dayjs().diff(leadLastActivityDate, 'days'),
                  leadTotalActivities: leadAllActivity.length,
                  leadLostTime: leadLost?.lostTime,
                  wonBy:
                    item.CmLead?.EnumStatus === 'Converted'
                      ? item.CmLead?.User?.full_name
                      : '',
                  leadLostReason: leadLost?.lostReason,
                  leadStage: item.CmLead?.LeadStatusData?.status_name,
                },
                CmContact: {
                  ...item.CmContact,
                  clientTotalActivities: contactAllActivity.length,
                },
              }
            }
          )

          return {
            retrieveActivityCount: graphData,
            count: ctx.prisma.activity.count({
              where: {
                due_start_date: {
                  gte: input.where?.startDate,
                  lte: input.where?.endDate,
                },
                ActivityType: { name: { in: input.where?.activityType } },
                status: { in: input.where?.status },
                AssignedUser: {
                  id: { in: input.where?.userId },
                },
                AND: {
                  OR: prepareSearchQuery,
                },
              },
            }),
            activityData: finalActivityRespons,
          }
        } catch (error) {
          return error
        }
      },
    })
  },
})
