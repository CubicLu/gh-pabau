import { mutationField, nonNull } from 'nexus'

export const CmExtraGymUpdateOneMutation = mutationField(
  'updateOneCmExtraGym',
  {
    type: nonNull('CmExtraGym'),
    args: {
      data: nonNull('CmExtraGymUpdateInput'),
      where: nonNull('CmExtraGymWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmExtraGym.update({
        where,
        data,
        ...select,
      })
    },
  },
)
