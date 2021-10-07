import { queryField, nonNull } from 'nexus'

export const AutomationFolderFindUniqueQuery = queryField(
  'findUniqueAutomationFolder',
  {
    type: 'AutomationFolder',
    args: {
      where: nonNull('AutomationFolderWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.automationFolder.findUnique({
        where,
        ...select,
      })
    },
  },
)
