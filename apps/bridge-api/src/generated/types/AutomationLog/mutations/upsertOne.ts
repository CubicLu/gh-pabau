import { mutationField, nonNull } from 'nexus'

export const AutomationLogUpsertOneMutation = mutationField(
  'upsertOneAutomationLog',
  {
    type: nonNull('AutomationLog'),
    args: {
      where: nonNull('AutomationLogWhereUniqueInput'),
      create: nonNull('AutomationLogCreateInput'),
      update: nonNull('AutomationLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.automationLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
