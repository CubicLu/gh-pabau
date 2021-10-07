import { queryField, nonNull, list } from 'nexus'

export const AutomationActionFindManyQuery = queryField(
  'findManyAutomationAction',
  {
    type: nonNull(list(nonNull('AutomationAction'))),
    args: {
      where: 'AutomationActionWhereInput',
      orderBy: list('AutomationActionOrderByWithRelationInput'),
      cursor: 'AutomationActionWhereUniqueInput',
      distinct: 'AutomationActionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationAction.findMany({
        ...args,
        ...select,
      })
    },
  },
)
