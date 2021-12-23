import { queryField, nonNull, list } from 'nexus'

export const ServiceRetailProductFindManyQuery = queryField(
  'findManyServiceRetailProduct',
  {
    type: nonNull(list(nonNull('ServiceRetailProduct'))),
    args: {
      where: 'ServiceRetailProductWhereInput',
      orderBy: list('ServiceRetailProductOrderByWithRelationInput'),
      cursor: 'ServiceRetailProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceRetailProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceRetailProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
