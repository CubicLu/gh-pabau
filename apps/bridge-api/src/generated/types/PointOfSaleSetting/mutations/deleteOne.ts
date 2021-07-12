import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingDeleteOneMutation = mutationField(
  'deleteOnePointOfSaleSetting',
  {
    type: 'PointOfSaleSetting',
    args: {
      where: nonNull('PointOfSaleSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pointOfSaleSetting.delete({
        where,
        ...select,
      })
    },
  },
)
