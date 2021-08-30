import { mutationField, nonNull } from 'nexus'

export const AutomationDelayUpsertOneMutation = mutationField(
  'upsertOneAutomationDelay',
  {
    type: nonNull('AutomationDelay'),
    args: {
      where: nonNull('AutomationDelayWhereUniqueInput'),
      create: nonNull('AutomationDelayCreateInput'),
      update: nonNull('AutomationDelayUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationDelay.upsert({
        ...args,
        ...select,
      })
    },
  },
)
