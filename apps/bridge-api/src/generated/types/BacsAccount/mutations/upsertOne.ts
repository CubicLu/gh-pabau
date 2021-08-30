import { mutationField, nonNull } from 'nexus'

export const BacsAccountUpsertOneMutation = mutationField(
  'upsertOneBacsAccount',
  {
    type: nonNull('BacsAccount'),
    args: {
      where: nonNull('BacsAccountWhereUniqueInput'),
      create: nonNull('BacsAccountCreateInput'),
      update: nonNull('BacsAccountUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bacsAccount.upsert({
        ...args,
        ...select,
      })
    },
  },
)
