import { mutationField, nonNull } from 'nexus'

export const InvCategoryCreateOneMutation = mutationField(
  'createOneInvCategory',
  {
    type: nonNull('InvCategory'),
    args: {
      data: nonNull('InvCategoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invCategory.create({
        data,
        ...select,
      })
    },
  },
)
