import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenUpdateOneMutation = mutationField(
  'updateOneAcceptEmailToken',
  {
    type: nonNull('AcceptEmailToken'),
    args: {
      where: nonNull('AcceptEmailTokenWhereUniqueInput'),
      data: nonNull('AcceptEmailTokenUpdateInput'),
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
