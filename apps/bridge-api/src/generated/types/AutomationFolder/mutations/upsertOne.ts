import { mutationField, nonNull } from 'nexus'

export const AutomationFolderUpsertOneMutation = mutationField(
  'upsertOneAutomationFolder',
  {
    type: nonNull('AutomationFolder'),
    args: {
      where: nonNull('AutomationFolderWhereUniqueInput'),
      create: nonNull('AutomationFolderCreateInput'),
      update: nonNull('AutomationFolderUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationFolder.upsert({
        ...args,
        ...select,
      })
    },
  },
)
