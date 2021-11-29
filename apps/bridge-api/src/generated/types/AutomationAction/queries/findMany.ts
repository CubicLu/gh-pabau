import { queryField, nonNull, list } from 'nexus'

export const AutomationActionFindManyQuery = queryField(
  'findManyAutomationAction',
  {
    type: nonNull(list(nonNull('AutomationAction'))),
    args: {
      where: 'AutomationActionWhereInput',
      orderBy: list('AutomationActionOrderByWithRelationInput'),
      cursor: 'AutomationActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationActionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationAction.findMany({
        ...args,
        ...select,
      })
    },
  },
)
