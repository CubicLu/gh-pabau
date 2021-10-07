import { queryField, nonNull, list } from 'nexus'

export const CleverpinSettingFindManyQuery = queryField(
  'findManyCleverpinSetting',
  {
    type: nonNull(list(nonNull('CleverpinSetting'))),
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByWithRelationInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      distinct: 'CleverpinSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
