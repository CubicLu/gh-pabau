import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralUpdateOneMutation = mutationField(
  'updateOneBookitProGeneral',
  {
    type: nonNull('BookitProGeneral'),
    args: {
      data: nonNull('BookitProGeneralUpdateInput'),
      where: nonNull('BookitProGeneralWhereUniqueInput'),
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
