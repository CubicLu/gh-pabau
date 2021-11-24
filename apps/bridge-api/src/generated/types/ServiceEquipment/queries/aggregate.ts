import { queryField, list } from 'nexus'

export const ServiceEquipmentAggregateQuery = queryField(
  'aggregateServiceEquipment',
  {
    type: 'AggregateServiceEquipment',
    args: {
      where: 'ServiceEquipmentWhereInput',
      orderBy: list('ServiceEquipmentOrderByWithRelationInput'),
      cursor: 'ServiceEquipmentWhereUniqueInput',
      distinct: 'ServiceEquipmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceEquipment.aggregate({ ...args, ...select }) as any
    },
  },
)
