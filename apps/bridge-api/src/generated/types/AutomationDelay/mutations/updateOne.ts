import { mutationField, nonNull } from 'nexus'

export const AutomationDelayUpdateOneMutation = mutationField(
  'updateOneAutomationDelay',
  {
    type: nonNull('AutomationDelay'),
    args: {
      where: nonNull('AutomationDelayWhereUniqueInput'),
      data: nonNull('AutomationDelayUpdateInput'),
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
