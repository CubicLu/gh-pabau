import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenUpsertOneMutation = mutationField(
  'upsertOneAcceptEmailToken',
  {
    type: nonNull('AcceptEmailToken'),
    args: {
      where: nonNull('AcceptEmailTokenWhereUniqueInput'),
      create: nonNull('AcceptEmailTokenCreateInput'),
      update: nonNull('AcceptEmailTokenUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acceptEmailToken.upsert({
        ...args,
        ...select,
      })
    },
  },
)
