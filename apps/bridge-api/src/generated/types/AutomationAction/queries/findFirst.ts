import { queryField, list } from 'nexus'

export const AutomationActionFindFirstQuery = queryField(
  'findFirstAutomationAction',
  {
    type: 'AutomationAction',
    args: {
      where: 'AutomationActionWhereInput',
      orderBy: list('AutomationActionOrderByInput'),
      cursor: 'AutomationActionWhereUniqueInput',
      distinct: 'AutomationActionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationAction.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
