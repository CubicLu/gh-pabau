import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateUpdateOneMutation = mutationField(
  'updateOneLabProductTemplate',
  {
    type: nonNull('LabProductTemplate'),
    args: {
      where: nonNull('LabProductTemplateWhereUniqueInput'),
      data: nonNull('LabProductTemplateUpdateInput'),
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
