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
  prepareFilterQuery,
  retrieveActivityData,
  manualFilterOnDateOperand,
  manualFilterOnBasicOperand,
  manualFilterOnStringOperand
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
  'Next activity date'
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

        const where = input.where
        const filterColumns = []
        if (where?.filterOption?.andFilterOption && where?.filterOption?.orFilterOption) {
          let andFilterOptions = where?.filterOption?.andFilterOption.map((item) => {
            return item.filterColumn
          })
          let orFilterOptions = where?.filterOption?.orFilterOption.map((item) => {
            return item.filterColumn
          })
          console.log('andFilterOptions--------------', andFilterOptions)
          console.log('orFilterOptions--------------', orFilterOptions)
          filterColumns.push(...andFilterOptions, ...orFilterOptions)
        }
        console.log('filterColumns--------------', filterColumns)
        
        try {
          if (customFilterColumnList.filter(item => filterColumns.includes(item))?.length === 0) {
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
          const prepareOrFilterQuery =
            where?.filterOption?.orFilterOption &&
            (await prepareFilterQuery(where?.filterOption?.orFilterOption, ctx))
          const andQuery = []
          const orQuery = []
          if (prepareAndFilterQuery) {
            andQuery.push(...prepareAndFilterQuery)
          }
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
          const activityData = await retrieveActivityData(where, ctx, input.skip, input.take, andQuery, orQuery, prepareSearchQuery, prepareOrderQuery, activitySelect)
          // const activityData = await ctx.prisma.activity.findMany({
          //   where: {
          //     due_start_date: {
          //       gte: where?.startDate,
          //       lte: where?.endDate,
          //     },
          //     ActivityType: { name: { in: where?.activityType } },
          //     status: { in: where?.status },
          //     AssignedUser: {
          //       id: { in: where?.userId },
          //     },
          //     AND: [
          //       ...andQuery,
          //       {
          //         OR: orQuery,
          //       },
          //       {
          //         OR: prepareSearchQuery,
          //       },
          //     ],
          //   },
          //   skip: input?.skip ?? 0,
          //   take: input?.take ?? 50,
          //   orderBy: prepareOrderQuery,
          //   select: {
          //     ...activitySelect.select,
          //     CmContact: {
          //       select: {
          //         ...activitySelect.select?.CmContact?.select,
          //         Activity: {
          //           select: {
          //             id: true,
          //             status: true,
          //             finished_at: true,
          //           },
          //         },
          //       },
          //     },
          //     CmLead: {
          //       select: {
          //         ...activitySelect.select?.CmLead?.select,
          //         CmLeadNote: {
          //           select: {
          //             Note: true,
          //             CreatedDate: true,
          //           },
          //         },
          //         Activity: {
          //           select: {
          //             id: true,
          //             status: true,
          //             finished_at: true,
          //           },
          //         },
          //         EnumStatus: true,
          //         LeadStatusData: {
          //           select: {
          //             status_name: true,
          //             is_convert: true,
          //           },
          //         },
          //       },
          //     },
          //   },
          // })

          const finalActivityResponse = await Promise.all(await activityData.map(
            async (item: ActivityData) => {
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
              let lastEmailSend = await ctx.prisma.communication.findFirst({
                where: {
                  from_address: {equals: item.CmLead?.Email},
                  company_id: {equals: ctx.authenticated.company}
                },
                orderBy: {
                  date: 'desc'
                }
              })
              let leadLastEmailReceived = await ctx.prisma.communicationRecipient.findMany({
                where: {
                  recipient_id: {equals: item.CmLead?.ID},
                  recipient_type: {equals: 'LEAD'}
                },
                orderBy: {
                  Communication: {
                    date: 'desc'
                  }
                },
                select: {
                  Communication: {
                    select: {
                      date: true
                    }
                  }
                }
              })
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
                  leadActivitesToDo: leadAllActivity.filter(
                    (item) => item?.status !== 'Done'
                  )?.length,
                  leadNextActivityDate: leadAllActivity.filter(
                    (item) => item?.status !== 'Done'
                  )?.[0].due_start_date,
                  leadLostTime: leadLost?.lostTime,
                  leadLastEmailReceived: leadLastEmailReceived?.[0]?.Communication?.date,
                  emailMessagesCount: leadLastEmailReceived.length, 
                  leadLastEmailSend: lastEmailSend?.date,
                  wonBy:
                    item.CmLead?.EnumStatus === 'Converted'
                      ? item.CmLead?.User?.full_name
                      : '',
                  wonTime:
                    item.CmLead?.EnumStatus === 'Converted'
                      ? item.CmLead?.CreatedDate
                      : null,
                  leadLostReason: leadLost?.lostReason,
                  leadStage: item.CmLead?.LeadStatusData?.status_name,
                },
                CmContact: {
                  ...item.CmContact,
                  clientTotalActivities: contactAllActivity.length,
                },
              }
            }
          ))

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
          // const prepareOrFilterQuery =
          //   where?.filterOption?.orFilterOption &&
          //   (await prepareFilterQuery(where?.filterOption?.orFilterOption, ctx))
          const andQuery = []
          const orQuery = []
          if (prepareAndFilterQuery) {
            andQuery.push(...prepareAndFilterQuery)
          }
          // console.log('prepareAndFilterQuery------------', prepareAndFilterQuery)
          // if (prepareOrFilterQuery) {
          //   orQuery.push(...prepareOrFilterQuery)
          // }
          const graphData = await retrieveActivityGraphData(
            ctx,
            where,
            prepareSearchQuery,
            andQuery,
            orQuery
          )
          const activityData = await retrieveActivityData(where, ctx, undefined, undefined, andQuery, orQuery, prepareSearchQuery, prepareOrderQuery, activitySelect)
          // console.log('activityData-------------', activityData)

          const finalActivityResponse = await Promise.all(await activityData.map(
            async (item: ActivityData) => {
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
              console.log('item--------------', item.CmLead.CommunicationRecipient)
              console.log('Email--------------', item.CmLead?.Email)
              let lastEmailSend = await ctx.prisma.communication.findFirst({
                where: {
                  from_address: {equals: item.CmLead?.Email},
                  company_id: {equals: ctx.authenticated.company}
                },
                orderBy: {
                  date: 'desc'
                }
              })
              let leadLastEmailReceived = await ctx.prisma.communicationRecipient.findMany({
                where: {
                  recipient_id: {equals: item.CmLead?.ID},
                  recipient_type: {equals: 'LEAD'}
                },
                orderBy: {
                  Communication: {
                    date: 'desc'
                  }
                },
                select: {
                  Communication: {
                    select: {
                      date: true
                    }
                  }
                }
              })
              console.log('lastEmailSend--------', lastEmailSend)
              console.log('leadLastEmailReceived--------', leadLastEmailReceived)
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
                  leadActivitesToDo: leadAllActivity.filter(
                    (item) => item?.status !== 'Done'
                  )?.length,
                  leadNextActivityDate: leadAllActivity.filter(
                    (item) => item?.status !== 'Done'
                  )?.[0].due_start_date,
                  leadLostTime: leadLost?.lostTime,
                  leadLastEmailSend: lastEmailSend?.date,
                  leadLastEmailReceived: leadLastEmailReceived?.[0]?.Communication?.date,
                  emailMessagesCount: leadLastEmailReceived.length, 
                  wonBy:
                    item.CmLead?.EnumStatus === 'Converted'
                      ? item.CmLead?.User?.full_name
                      : '',
                  wonTime:
                    item.CmLead?.EnumStatus === 'Converted'
                      ? item.CmLead?.CreatedDate
                      : null,
                  leadLostReason: leadLost?.lostReason,
                  leadStage: item.CmLead?.LeadStatusData?.status_name,
                },
                CmContact: {
                  ...item.CmContact,
                  clientTotalActivities: contactAllActivity.length,
                },
              }
            }
          ))

          // console.log('finalActivityResponse--------------', finalActivityResponse)
          const customColumns = customFilterColumnList.filter(item => filterColumns.includes(item))
          const availableCustomColumns = where?.filterOption?.andFilterOption.map((item) => {
            if (customColumns.includes(item.filterColumn)) {
              return item
            }
          })
          // console.log('availableCustomColumns--------------', availableCustomColumns)
          let response = finalActivityResponse.map((item) => {
            for (let columnValue of availableCustomColumns) {
              switch(columnValue.filterColumn) {
                case 'Lead done activities': {
                  manualFilterOnBasicOperand(columnValue, 'leadDoneActivities', item)
                  break
                }
                case 'First activity time': {
                  manualFilterOnDateOperand(columnValue, 'firstActivityTime', item)
                  break
                }
                case 'Lead last activity date': {
                  manualFilterOnDateOperand(columnValue, 'leadLastActivityDate', item)
                  break
                }
                case 'Lead last activity (days)': {
                  manualFilterOnBasicOperand(columnValue, 'leadDoneActivities', item)
                  break
                }
                case 'Lead lost reason': {
                  manualFilterOnStringOperand(columnValue, 'leadLostReason', item)
                  break
                }
                case 'Lead total activities': {
                  manualFilterOnBasicOperand(columnValue, 'leadTotalActivities', item)
                  break
                }
                case 'Lead lost time': {
                  manualFilterOnDateOperand(columnValue, 'leadLostTime', item)
                  break
                }
                case 'Activities to do': {
                  manualFilterOnBasicOperand(columnValue, 'leadActivitesToDo', item)
                  break
                }
                case 'Next activity date': {
                  manualFilterOnDateOperand(columnValue, 'leadNextActivityDate', item)
                  break
                }
                case 'Last email received': {
                  manualFilterOnDateOperand(columnValue, 'leadLastEmailReceived', item)
                  break
                }
                case 'Last email sent': {
                  manualFilterOnDateOperand(columnValue, 'leadLastEmailSend', item)
                  break
                }
                case 'Email messages count': {
                  manualFilterOnBasicOperand(columnValue, 'emailMessagesCount', item)
                  break
                }
                // case 'First activity time'
                // case 'Lead last activity date'
                // case 'Lead last activity (days)'
                // case 'Lead lost reason'
                // case 'Lead total activities'
                // case 'Lead lost time'
                // case 'Activities to do'
                // case 'Last email received'
                // case 'Last email sent'
                // case 'Next activity date'
              }
            }
            // switch (item.fil)
            // return item
          })
          // console.log('response-------------------', response)

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
          }
          
        } catch (error) {
          return error
        }
      },
    })
  },
})
