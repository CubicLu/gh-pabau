import { mutationField, nonNull } from 'nexus'

export const AutomationDelayUpdateManyMutation = mutationField(
  'updateManyAutomationDelay',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AutomationDelayWhereInput',
      data: nonNull('AutomationDelayUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationDelay.updateMany(args as any)
    },
  },
)
