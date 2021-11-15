import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateDeleteOneMutation = mutationField(
  'deleteOneLabProductTemplate',
  {
    type: 'LabProductTemplate',
    args: {
      where: nonNull('LabProductTemplateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.labProductTemplate.delete({
        where,
        ...select,
      })
    },
  },
)
