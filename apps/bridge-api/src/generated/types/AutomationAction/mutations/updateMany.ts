import { mutationField, nonNull } from 'nexus'

export const AutomationActionUpdateManyMutation = mutationField(
  'updateManyAutomationAction',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AutomationActionUpdateManyMutationInput'),
      where: 'AutomationActionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.automationAction.updateMany(args as any)
    },
  },
)
