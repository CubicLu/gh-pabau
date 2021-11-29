import { queryField, nonNull, list } from 'nexus'

export const AutomationFolderFindCountQuery = queryField(
  'findManyAutomationFolderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AutomationFolderWhereInput',
      orderBy: list('AutomationFolderOrderByWithRelationInput'),
      cursor: 'AutomationFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationFolderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationFolder.count(args as any)
    },
  },
)
