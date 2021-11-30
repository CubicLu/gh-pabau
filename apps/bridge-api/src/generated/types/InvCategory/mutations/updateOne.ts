import { mutationField, nonNull } from 'nexus'

export const InvCategoryUpdateOneMutation = mutationField(
  'updateOneInvCategory',
  {
    type: nonNull('InvCategory'),
    args: {
      data: nonNull('InvCategoryUpdateInput'),
      where: nonNull('InvCategoryWhereUniqueInput'),
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
