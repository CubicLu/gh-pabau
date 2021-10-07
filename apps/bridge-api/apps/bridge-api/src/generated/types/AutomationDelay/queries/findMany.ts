import { queryField, nonNull, list } from 'nexus'

export const AutomationDelayFindManyQuery = queryField(
  'findManyAutomationDelay',
  {
    type: nonNull(list(nonNull('AutomationDelay'))),
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      distinct: 'AutomationDelayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.findMany({
        ...args,
        ...select,
      })
    },
  },
)
