import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessUpsertOneMutation = mutationField(
  'upsertOneThirdPartyAccess',
  {
    type: nonNull('ThirdPartyAccess'),
    args: {
      where: nonNull('ThirdPartyAccessWhereUniqueInput'),
      create: nonNull('ThirdPartyAccessCreateInput'),
      update: nonNull('ThirdPartyAccessUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.thirdPartyAccess.upsert({
        ...args,
        ...select,
      })
    },
  },
)
