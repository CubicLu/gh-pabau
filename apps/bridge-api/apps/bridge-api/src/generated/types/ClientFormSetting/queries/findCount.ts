import { queryField, nonNull, list } from 'nexus'

export const ClientFormSettingFindCountQuery = queryField(
  'findManyClientFormSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClientFormSettingWhereInput',
      orderBy: list('ClientFormSettingOrderByWithRelationInput'),
      cursor: 'ClientFormSettingWhereUniqueInput',
      distinct: 'ClientFormSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clientFormSetting.count(args as any)
    },
  },
)
