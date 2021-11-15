import { extendType, objectType, inputObjectType, intArg, nonNull } from 'nexus'
import { Context } from '../../../context'
import { PrismaSelect } from '@paljs/plugins'
import {
  retrieveActivityGraphData,
  prepareSearchObject,
  prepareSortingObject,
  prepareFilterQuery,
  retrieveActivityData,
  prepareActivityDataWithCustomField,
  manualFilterOnAndOperandColumns,
  manualFilterOnOrOperandColumns,
} from '../activity'
import { groupBy } from 'lodash'

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
    t.field('Contact', { type: 'CmContact' })
    t.field('PipelineStage', { type: 'PipelineStage' })
    t.field('ConvertDate', { type: 'DateTime' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.field('LastUpdated', { type: 'DateTime' })
    t.int('leadDoneActivities')
    t.int('leadActivitesToDo')
    t.int('emailMessagesCount')
    t.int('location_id')
    t.field('Location', { type: 'CompanyBranch' })
    t.field('firstActivityTime', { type: 'DateTime' })
    t.field('leadLastActivityDate', { type: 'DateTime' })
    t.field('leadNextActivityDate', { type: 'DateTime' })
    t.field('leadLastEmailReceived', { type: 'DateTime' })
    t.field('leadLastEmailSend', { type: 'DateTime' })
    t.int('leadLastActivityDays')
    t.int('leadTotalActivities')
    t.string('leadLostReason')
    t.field('leadLostTime', { type: 'DateTime' })
    t.string('wonBy')
    t.field('wonTime', { type: 'DateTime' })
    t.field('MarketingSource', { type: 'MarketingSource' })
    t.string('leadStage')
    t.string('EnumStatus')
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

export const FilterOptionItem = inputObjectType({
  name: 'FilterOptionItem',
  definition(t) {
    t.nonNull.string('type')
    t.nonNull.string('filterColumn')
    t.nonNull.string('menuOption')
    t.nonNull.string('operand')
  },
})

export const FilterOption = inputObjectType({
  name: 'FilterOption',
  definition(t) {
    t.string('name')
    t.boolean('shared')
    t.list.string('column')
    t.list.field('andFilterOption', { type: 'FilterOptionItem' })
    t.list.field('orFilterOption', { type: 'FilterOptionItem' })
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
    t.field('filterOption', { type: 'FilterOption' })
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
  'wonTime',
  'leadLostReason',
  'leadStage',
  'leadActivitesToDo',
  'emailMessagesCount',
  'leadLastEmailSend',
  'leadLastEmailReceived',
  'leadLastEmailReceived1',
  'leadNextActivityDate',
]

const customFilterColumnList = [
  'Lead done activities',
  'First activity time',
  'Lead last activity date',
  'Lead last activity (days)',
  'Lead lost reason',
  'Lead total activities',
  'Lead lost time',
  'Activities to do',
  'Last email received',
  'Last email sent',
  'Next activity date',
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

        // eslint-disable-next-line unicorn/prefer-object-from-entries
        input.where = Object.entries(input.where).reduce(
          (acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }
            return acc
          },
          {}
        )

        const where = input.where
        const filterColumns = []
        if (
          where?.filterOption?.andFilterOption &&
          where?.filterOption?.orFilterOption
        ) {
          const andFilterOptions = where?.filterOption?.andFilterOption.map(
            (item) => {
              return item.filterColumn
            }
          )
          const orFilterOptions = where?.filterOption?.orFilterOption.map(
            (item) => {
              return item.filterColumn
            }
          )
          filterColumns.push(...andFilterOptions, ...orFilterOptions)
        }

        try {
          const prepareSearchQuery =
            where?.search &&
            prepareSearchObject(where?.search, where?.activeColumns)
          const prepareOrderQuery = prepareSortingObject(
            where?.orderValue?.order,
            where?.orderValue?.field
          )
          const prepareAndFilterQuery =
            where?.filterOption?.andFilterOption &&
            (await prepareFilterQuery(
              where?.filterOption?.andFilterOption,
              ctx
            ))
          const andQuery = []
          const orQuery = []
          if (prepareAndFilterQuery) {
            andQuery.push(...prepareAndFilterQuery)
          }
          if (
            customFilterColumnList.filter((item) =>
              filterColumns.includes(item)
            )?.length === 0
          ) {
            const prepareOrFilterQuery =
              where?.filterOption?.orFilterOption &&
              (await prepareFilterQuery(
                where?.filterOption?.orFilterOption,
                ctx
              ))

            if (prepareOrFilterQuery) {
              orQuery.push(...prepareOrFilterQuery)
            }
            const graphData = await retrieveActivityGraphData(
              ctx,
              where,
              prepareSearchQuery,
              andQuery,
              orQuery
            )
            const activityData = await retrieveActivityData(
              where,
              ctx,
              input.skip,
              input.take,
              andQuery,
              orQuery,
              prepareSearchQuery,
              prepareOrderQuery,
              activitySelect
            )
            const finalActivityResponse = await prepareActivityDataWithCustomField(
              ctx,
              activityData
            )

            return {
              retrieveActivityCount: graphData,
              count: ctx.prisma.activity.count({
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
              }),
              activityData: finalActivityResponse,
            }
          } else {
            const activityData = await retrieveActivityData(
              where,
              ctx,
              undefined,
              undefined,
              andQuery,
              orQuery,
              prepareSearchQuery,
              prepareOrderQuery,
              activitySelect
            )

            const finalActivityResponse = await prepareActivityDataWithCustomField(
              ctx,
              activityData
            )

            const customColumns = new Set(
              customFilterColumnList.filter((item) =>
                filterColumns.includes(item)
              )
            )
            const availableCustomColumns = where?.filterOption?.andFilterOption
              .map((item) => {
                if (customColumns.has(item.filterColumn)) {
                  return item
                }
                return undefined
              })
              .filter((item) => item)
            const activityFilterData = []
            if (availableCustomColumns.length > 0) {
              const response = manualFilterOnAndOperandColumns(
                finalActivityResponse,
                availableCustomColumns
              )
              activityFilterData.push(...response)
            } else {
              activityFilterData.push(...finalActivityResponse)
            }
            const activity = []
            if (where?.filterOption?.orFilterOption?.length > 0) {
              const response = await manualFilterOnOrOperandColumns(
                activityFilterData,
                where?.filterOption?.orFilterOption,
                ctx
              )
              activity.push(...response)
            } else {
              activity.push(...activityFilterData)
            }

            const groupData = groupBy(activity, 'status')

            return {
              retrieveActivityCount: {
                reopened: groupData?.['Reopened']?.length,
                awaiting: groupData?.['Awaiting']?.length,
                done: groupData?.['Done']?.length,
                pending: groupData?.['Pending']?.length,
                working: groupData?.['Working on']?.length,
              },
              count: activity.length,
              activityData: activity.slice(input.skip, input.skip + input.take),
            }
          }
        } catch (error) {
          return error
        }
      },
    })
  },
})
