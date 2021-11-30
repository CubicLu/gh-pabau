import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateUpdateOneMutation = mutationField(
  'updateOneLabProductTemplate',
  {
    type: nonNull('LabProductTemplate'),
    args: {
      data: nonNull('LabProductTemplateUpdateInput'),
      where: nonNull('LabProductTemplateWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.labProductTemplate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
