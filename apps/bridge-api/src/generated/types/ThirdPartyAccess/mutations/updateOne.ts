import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessUpdateOneMutation = mutationField(
  'updateOneThirdPartyAccess',
  {
    type: nonNull('ThirdPartyAccess'),
    args: {
      where: nonNull('ThirdPartyAccessWhereUniqueInput'),
      data: nonNull('ThirdPartyAccessUpdateInput'),
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
