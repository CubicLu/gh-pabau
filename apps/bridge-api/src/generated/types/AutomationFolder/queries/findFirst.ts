import { queryField, list } from 'nexus'

export const AutomationFolderFindFirstQuery = queryField(
  'findFirstAutomationFolder',
  {
    type: 'AutomationFolder',
    args: {
      where: 'AutomationFolderWhereInput',
      orderBy: list('AutomationFolderOrderByWithRelationInput'),
      cursor: 'AutomationFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AutomationFolderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationFolder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
