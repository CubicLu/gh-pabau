import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralUpdateOneMutation = mutationField(
  'updateOneBookitProGeneral',
  {
    type: nonNull('BookitProGeneral'),
    args: {
      where: nonNull('BookitProGeneralWhereUniqueInput'),
      data: nonNull('BookitProGeneralUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookitProGeneral.update({
        where,
        data,
        ...select,
      })
    },
  },
)
