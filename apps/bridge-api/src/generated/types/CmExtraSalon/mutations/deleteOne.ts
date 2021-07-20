import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonDeleteOneMutation = mutationField(
  'deleteOneCmExtraSalon',
  {
    type: 'CmExtraSalon',
    args: {
      where: nonNull('CmExtraSalonWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmExtraSalon.delete({
        where,
        ...select,
      })
    },
  },
)
