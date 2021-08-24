import { mutationField, nonNull } from 'nexus'

export const InvCategoryUpdateOneMutation = mutationField(
  'updateOneInvCategory',
  {
    type: nonNull('InvCategory'),
    args: {
      where: nonNull('InvCategoryWhereUniqueInput'),
      data: nonNull('InvCategoryUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invCategory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
