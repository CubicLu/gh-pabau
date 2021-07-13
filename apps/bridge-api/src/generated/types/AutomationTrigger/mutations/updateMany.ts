import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerUpdateManyMutation = mutationField(
  'updateManyAutomationTrigger',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AutomationTriggerWhereInput',
      data: nonNull('AutomationTriggerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationTrigger.updateMany(args as any)
    },
  },
)
