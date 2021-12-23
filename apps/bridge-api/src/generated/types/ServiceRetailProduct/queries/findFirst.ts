import { queryField, list } from 'nexus'

export const ServiceRetailProductFindFirstQuery = queryField(
  'findFirstServiceRetailProduct',
  {
    type: 'ServiceRetailProduct',
    args: {
      where: 'ServiceRetailProductWhereInput',
      orderBy: list('ServiceRetailProductOrderByWithRelationInput'),
      cursor: 'ServiceRetailProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceRetailProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceRetailProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
