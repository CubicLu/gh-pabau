import { queryField, list } from 'nexus'

export const ClientFormSettingAggregateQuery = queryField(
  'aggregateClientFormSetting',
  {
    type: 'AggregateClientFormSetting',
    args: {
      where: 'ClientFormSettingWhereInput',
      orderBy: list('ClientFormSettingOrderByWithRelationInput'),
      cursor: 'ClientFormSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clientFormSetting.aggregate({ ...args, ...select }) as any
    },
  },
)
