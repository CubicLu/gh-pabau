import { mutationField, nonNull } from 'nexus'

export const CmExtraGymUpdateOneMutation = mutationField(
  'updateOneCmExtraGym',
  {
    type: nonNull('CmExtraGym'),
    args: {
      where: nonNull('CmExtraGymWhereUniqueInput'),
      data: nonNull('CmExtraGymUpdateInput'),
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
