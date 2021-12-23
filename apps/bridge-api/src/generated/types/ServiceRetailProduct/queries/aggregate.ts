import { queryField, list } from 'nexus'

export const ServiceRetailProductAggregateQuery = queryField(
  'aggregateServiceRetailProduct',
  {
    type: 'AggregateServiceRetailProduct',
    args: {
      where: 'ServiceRetailProductWhereInput',
      orderBy: list('ServiceRetailProductOrderByWithRelationInput'),
      cursor: 'ServiceRetailProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceRetailProduct.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
