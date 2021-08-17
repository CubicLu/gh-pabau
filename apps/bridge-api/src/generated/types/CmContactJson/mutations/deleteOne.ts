import { mutationField, nonNull } from 'nexus'

export const CmContactJsonDeleteOneMutation = mutationField(
  'deleteOneCmContactJson',
  {
    type: 'CmContactJson',
    args: {
      where: nonNull('CmContactJsonWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactJson.delete({
        where,
        ...select,
      })
    },
  },
)
