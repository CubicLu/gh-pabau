import { mutationField, nonNull } from 'nexus'

export const CmContactCustomDeleteOneMutation = mutationField(
  'deleteOneCmContactCustom',
  {
    type: 'CmContactCustom',
    args: {
      where: nonNull('CmContactCustomWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactCustom.delete({
        where,
        ...select,
      })
    },
  },
)
