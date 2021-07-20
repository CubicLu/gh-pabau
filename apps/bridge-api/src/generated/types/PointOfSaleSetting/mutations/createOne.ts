import { mutationField, nonNull } from 'nexus'

export const PointOfSaleSettingCreateOneMutation = mutationField(
  'createOnePointOfSaleSetting',
  {
    type: nonNull('PointOfSaleSetting'),
    args: {
      data: nonNull('PointOfSaleSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pointOfSaleSetting.create({
        data,
        ...select,
      })
    },
  },
)
