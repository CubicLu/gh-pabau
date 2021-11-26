import { queryField, list } from 'nexus'

export const AutomationActionAggregateQuery = queryField(
  'aggregateAutomationAction',
  {
    type: 'AggregateAutomationAction',
    args: {
      where: 'AutomationActionWhereInput',
      orderBy: list('AutomationActionOrderByWithRelationInput'),
      cursor: 'AutomationActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationAction.aggregate({ ...args, ...select }) as any
    },
  },
)
