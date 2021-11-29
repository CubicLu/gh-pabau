import { queryField, list } from 'nexus'

export const AutomationDelayFindFirstQuery = queryField(
  'findFirstAutomationDelay',
  {
    type: 'AutomationDelay',
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationDelayScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
