import { queryField, nonNull, list } from 'nexus'

export const AutomationFolderFindManyQuery = queryField(
  'findManyAutomationFolder',
  {
    type: nonNull(list(nonNull('AutomationFolder'))),
    args: {
      where: 'AutomationFolderWhereInput',
      orderBy: list('AutomationFolderOrderByWithRelationInput'),
      cursor: 'AutomationFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationFolderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationFolder.findMany({
        ...args,
        ...select,
      })
    },
  },
)
