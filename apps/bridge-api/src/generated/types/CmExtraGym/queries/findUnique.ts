import { queryField, nonNull } from 'nexus'

export const CmExtraGymFindUniqueQuery = queryField('findUniqueCmExtraGym', {
  type: 'CmExtraGym',
  args: {
    where: nonNull('CmExtraGymWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmExtraGym.findUnique({
      where,
      ...select,
    })
  },
})
