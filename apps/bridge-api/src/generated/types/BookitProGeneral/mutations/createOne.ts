import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralCreateOneMutation = mutationField(
  'createOneBookitProGeneral',
  {
    type: nonNull('BookitProGeneral'),
    args: {
      data: nonNull('BookitProGeneralCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookitProGeneral.create({
        data,
        ...select,
      })
    },
  },
)
