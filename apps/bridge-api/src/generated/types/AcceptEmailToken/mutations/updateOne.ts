import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenUpdateOneMutation = mutationField(
  'updateOneAcceptEmailToken',
  {
    type: nonNull('AcceptEmailToken'),
    args: {
      data: nonNull('AcceptEmailTokenUpdateInput'),
      where: nonNull('AcceptEmailTokenWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.acceptEmailToken.update({
        where,
        data,
        ...select,
      })
    },
  },
)
