import { queryField, nonNull, list } from 'nexus'

export const ClientFormSettingFindManyQuery = queryField(
  'findManyClientFormSetting',
  {
    type: nonNull(list(nonNull('ClientFormSetting'))),
    args: {
      where: 'ClientFormSettingWhereInput',
      orderBy: list('ClientFormSettingOrderByWithRelationInput'),
      cursor: 'ClientFormSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClientFormSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clientFormSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
