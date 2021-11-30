import { mutationField, nonNull } from 'nexus'

export const AutomationTriggerUpdateManyMutation = mutationField(
  'updateManyAutomationTrigger',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AutomationTriggerUpdateManyMutationInput'),
      where: 'AutomationTriggerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationTrigger.updateMany(args as any)
    },
  },
)
