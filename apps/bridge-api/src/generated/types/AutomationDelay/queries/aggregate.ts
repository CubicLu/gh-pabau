import { queryField, list } from 'nexus'

export const AutomationDelayAggregateQuery = queryField(
  'aggregateAutomationDelay',
  {
    type: 'AggregateAutomationDelay',
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      distinct: 'AutomationDelayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.aggregate({ ...args, ...select }) as any
    },
  },
)
