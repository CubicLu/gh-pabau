import { queryField, list } from 'nexus'

export const AutomationDelayFindFirstQuery = queryField(
  'findFirstAutomationDelay',
  {
    type: 'AutomationDelay',
    args: {
      where: 'AutomationDelayWhereInput',
      orderBy: list('AutomationDelayOrderByWithRelationInput'),
      cursor: 'AutomationDelayWhereUniqueInput',
      distinct: 'AutomationDelayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
