import { queryField, nonNull } from 'nexus'

export const AutomationActionFindUniqueQuery = queryField(
  'findUniqueAutomationAction',
  {
    type: 'AutomationAction',
    args: {
      where: nonNull('AutomationActionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.automationAction.findUnique({
        where,
        ...select,
      })
    },
  },
)
