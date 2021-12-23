import { queryField, nonNull } from 'nexus'

export const ServiceRetailProductFindUniqueQuery = queryField(
  'findUniqueServiceRetailProduct',
  {
    type: 'ServiceRetailProduct',
    args: {
      where: nonNull('ServiceRetailProductWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceRetailProduct.findUnique({
        where,
        ...select,
      })
    },
  },
)
