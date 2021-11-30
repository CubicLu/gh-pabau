import { queryField, nonNull, list } from 'nexus'

export const AutomationDelayFindManyQuery = queryField(
  'findManyAutomationDelay',
  {
    type: nonNull(list(nonNull('AutomationDelay'))),
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationDelayScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.findMany({
        ...args,
        ...select,
      })
    },
  },
)
