import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenCreateOneMutation = mutationField(
  'createOneAcceptEmailToken',
  {
    type: nonNull('AcceptEmailToken'),
    args: {
      data: nonNull('AcceptEmailTokenCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.acceptEmailToken.create({
        data,
        ...select,
      })
    },
  },
)
