import { queryField, nonNull, list } from 'nexus'

export const AutomationLogFindManyQuery = queryField('findManyAutomationLog', {
  type: nonNull(list(nonNull('AutomationLog'))),
  args: {
    where: 'AutomationLogWhereInput',
    orderBy: list('AutomationLogOrderByWithRelationInput'),
    cursor: 'AutomationLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AutomationLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.automationLog.findMany({
      ...args,
      ...select,
    })
  },
})
