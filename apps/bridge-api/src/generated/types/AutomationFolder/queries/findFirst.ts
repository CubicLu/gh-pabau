import { queryField, list } from 'nexus'

export const AutomationFolderFindFirstQuery = queryField(
  'findFirstAutomationFolder',
  {
    type: 'AutomationFolder',
    args: {
      where: 'AutomationFolderWhereInput',
      orderBy: list('AutomationFolderOrderByInput'),
      cursor: 'AutomationFolderWhereUniqueInput',
      distinct: 'AutomationFolderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationFolder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
