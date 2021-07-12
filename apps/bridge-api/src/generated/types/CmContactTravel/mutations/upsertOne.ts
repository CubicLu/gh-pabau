import { mutationField, nonNull } from 'nexus'

export const CmContactTravelUpsertOneMutation = mutationField(
  'upsertOneCmContactTravel',
  {
    type: nonNull('CmContactTravel'),
    args: {
      where: nonNull('CmContactTravelWhereUniqueInput'),
      create: nonNull('CmContactTravelCreateInput'),
      update: nonNull('CmContactTravelUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactTravel.upsert({
        ...args,
        ...select,
      })
    },
  },
)
