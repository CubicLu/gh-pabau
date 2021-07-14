import { mutationField, nonNull } from 'nexus'

export const AutomationFolderDeleteOneMutation = mutationField(
  'deleteOneAutomationFolder',
  {
    type: 'AutomationFolder',
    args: {
      where: nonNull('AutomationFolderWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.automationFolder.delete({
        where,
        ...select,
      })
    },
  },
)
