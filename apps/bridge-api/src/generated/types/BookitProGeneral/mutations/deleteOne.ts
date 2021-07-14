import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralDeleteOneMutation = mutationField(
  'deleteOneBookitProGeneral',
  {
    type: 'BookitProGeneral',
    args: {
      where: nonNull('BookitProGeneralWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookitProGeneral.delete({
        where,
        ...select,
      })
    },
  },
)
