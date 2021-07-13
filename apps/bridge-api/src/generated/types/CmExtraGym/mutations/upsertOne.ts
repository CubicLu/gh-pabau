import { mutationField, nonNull } from 'nexus'

export const CmExtraGymUpsertOneMutation = mutationField(
  'upsertOneCmExtraGym',
  {
    type: nonNull('CmExtraGym'),
    args: {
      where: nonNull('CmExtraGymWhereUniqueInput'),
      create: nonNull('CmExtraGymCreateInput'),
      update: nonNull('CmExtraGymUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraGym.upsert({
        ...args,
        ...select,
      })
    },
  },
)
