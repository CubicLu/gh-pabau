import { mutationField, nonNull } from 'nexus'

export const AutomationDelayUpdateOneMutation = mutationField(
  'updateOneAutomationDelay',
  {
    type: nonNull('AutomationDelay'),
    args: {
      data: nonNull('AutomationDelayUpdateInput'),
      where: nonNull('AutomationDelayWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.automationDelay.update({
        where,
        data,
        ...select,
      })
    },
  },
)
