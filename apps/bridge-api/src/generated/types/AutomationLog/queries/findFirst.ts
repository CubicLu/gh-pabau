import { queryField, list } from 'nexus'

export const AutomationLogFindFirstQuery = queryField(
  'findFirstAutomationLog',
  {
    type: 'AutomationLog',
    args: {
      where: 'AutomationLogWhereInput',
      orderBy: list('AutomationLogOrderByWithRelationInput'),
      cursor: 'AutomationLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
