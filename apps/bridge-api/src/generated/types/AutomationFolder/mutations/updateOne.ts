import { mutationField, nonNull } from 'nexus'

export const AutomationFolderUpdateOneMutation = mutationField(
  'updateOneAutomationFolder',
  {
    type: nonNull('AutomationFolder'),
    args: {
      where: nonNull('AutomationFolderWhereUniqueInput'),
      data: nonNull('AutomationFolderUpdateInput'),
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
