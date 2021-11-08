import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateUpsertOneMutation = mutationField(
  'upsertOneLabProductTemplate',
  {
    type: nonNull('LabProductTemplate'),
    args: {
      where: nonNull('LabProductTemplateWhereUniqueInput'),
      create: nonNull('LabProductTemplateCreateInput'),
      update: nonNull('LabProductTemplateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labProductTemplate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
