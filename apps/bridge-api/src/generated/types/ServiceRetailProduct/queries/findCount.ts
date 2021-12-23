import { queryField, nonNull, list } from 'nexus'

export const ServiceRetailProductFindCountQuery = queryField(
  'findManyServiceRetailProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceRetailProductWhereInput',
      orderBy: list('ServiceRetailProductOrderByWithRelationInput'),
      cursor: 'ServiceRetailProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceRetailProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceRetailProduct.count(args as any)
    },
  },
)
