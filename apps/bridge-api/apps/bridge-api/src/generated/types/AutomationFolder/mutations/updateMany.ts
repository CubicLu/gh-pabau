import { mutationField, nonNull } from 'nexus'

export const AutomationFolderUpdateManyMutation = mutationField(
  'updateManyAutomationFolder',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AutomationFolderWhereInput',
      data: nonNull('AutomationFolderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationFolder.updateMany(args as any)
    },
  },
)
