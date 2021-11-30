import { mutationField, nonNull } from 'nexus'

export const AutomationLogUpdateManyMutation = mutationField(
  'updateManyAutomationLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AutomationLogUpdateManyMutationInput'),
      where: 'AutomationLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationLog.updateMany(args as any)
    },
  },
)
