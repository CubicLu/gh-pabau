import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessUpdateOneMutation = mutationField(
  'updateOneThirdPartyAccess',
  {
    type: nonNull('ThirdPartyAccess'),
    args: {
      data: nonNull('ThirdPartyAccessUpdateInput'),
      where: nonNull('ThirdPartyAccessWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.thirdPartyAccess.update({
        where,
        data,
        ...select,
      })
    },
  },
)
