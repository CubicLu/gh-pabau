import { mutationField, nonNull } from 'nexus'

export const AutomationLogUpdateManyMutation = mutationField(
  'updateManyAutomationLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AutomationLogWhereInput',
      data: nonNull('AutomationLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationLog.updateMany(args as any)
    },
  },
)
