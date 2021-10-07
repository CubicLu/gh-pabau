import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessCreateOneMutation = mutationField(
  'createOneThirdPartyAccess',
  {
    type: nonNull('ThirdPartyAccess'),
    args: {
      data: nonNull('ThirdPartyAccessCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.thirdPartyAccess.create({
        data,
        ...select,
      })
    },
  },
)
