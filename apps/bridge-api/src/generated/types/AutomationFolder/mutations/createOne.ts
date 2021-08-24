import { mutationField, nonNull } from 'nexus'

export const AutomationFolderCreateOneMutation = mutationField(
  'createOneAutomationFolder',
  {
    type: nonNull('AutomationFolder'),
    args: {
      data: nonNull('AutomationFolderCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.automationFolder.create({
        data,
        ...select,
      })
    },
  },
)
