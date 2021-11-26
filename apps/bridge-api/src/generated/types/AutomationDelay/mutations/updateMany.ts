import { mutationField, nonNull } from 'nexus'

export const AutomationDelayUpdateManyMutation = mutationField(
  'updateManyAutomationDelay',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AutomationDelayUpdateManyMutationInput'),
      where: 'AutomationDelayWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationDelay.updateMany(args as any)
    },
  },
)
