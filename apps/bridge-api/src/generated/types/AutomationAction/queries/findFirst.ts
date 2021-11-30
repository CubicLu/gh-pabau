import { queryField, list } from 'nexus'

export const AutomationActionFindFirstQuery = queryField(
  'findFirstAutomationAction',
  {
    type: 'AutomationAction',
    args: {
      where: 'AutomationActionWhereInput',
      orderBy: list('AutomationActionOrderByWithRelationInput'),
      cursor: 'AutomationActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationActionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationAction.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
