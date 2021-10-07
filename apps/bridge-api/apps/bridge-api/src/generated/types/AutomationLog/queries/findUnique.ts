import { queryField, nonNull } from 'nexus'

export const AutomationLogFindUniqueQuery = queryField(
  'findUniqueAutomationLog',
  {
    type: 'AutomationLog',
    args: {
      where: nonNull('AutomationLogWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.automationLog.findUnique({
        where,
        ...select,
      })
    },
  },
)
