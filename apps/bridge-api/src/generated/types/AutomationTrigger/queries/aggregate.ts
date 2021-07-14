import { queryField, list } from 'nexus'

export const AutomationTriggerAggregateQuery = queryField(
  'aggregateAutomationTrigger',
  {
    type: 'AggregateAutomationTrigger',
    args: {
      where: 'AutomationTriggerWhereInput',
      orderBy: list('AutomationTriggerOrderByInput'),
      cursor: 'AutomationTriggerWhereUniqueInput',
      distinct: 'AutomationTriggerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationTrigger.aggregate({ ...args, ...select }) as any
    },
  },
)
