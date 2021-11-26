import { mutationField, nonNull } from 'nexus'

export const AutomationFolderUpdateOneMutation = mutationField(
  'updateOneAutomationFolder',
  {
    type: nonNull('AutomationFolder'),
    args: {
      data: nonNull('AutomationFolderUpdateInput'),
      where: nonNull('AutomationFolderWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.automationFolder.update({
        where,
        data,
        ...select,
      })
    },
  },
)
