import { mutationField, nonNull } from 'nexus'

export const CmContactLabelDeleteOneMutation = mutationField(
  'deleteOneCmContactLabel',
  {
    type: 'CmContactLabel',
    args: {
      where: nonNull('CmContactLabelWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactLabel.delete({
        where,
        ...select,
      })
    },
  },
)
