import { mutationField, nonNull } from 'nexus'

export const AutomationFolderUpdateManyMutation = mutationField(
  'updateManyAutomationFolder',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AutomationFolderUpdateManyMutationInput'),
      where: 'AutomationFolderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationFolder.updateMany(args as any)
    },
  },
)
