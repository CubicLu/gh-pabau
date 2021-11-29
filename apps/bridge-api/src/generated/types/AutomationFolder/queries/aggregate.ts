import { queryField, list } from 'nexus'

export const AutomationFolderAggregateQuery = queryField(
  'aggregateAutomationFolder',
  {
    type: 'AggregateAutomationFolder',
    args: {
      where: 'AutomationFolderWhereInput',
      orderBy: list('AutomationFolderOrderByWithRelationInput'),
      cursor: 'AutomationFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationFolder.aggregate({ ...args, ...select }) as any
    },
  },
)
