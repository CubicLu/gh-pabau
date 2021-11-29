import { queryField, nonNull, list } from 'nexus'

export const CleverpinSettingFindManyQuery = queryField(
  'findManyCleverpinSetting',
  {
    type: nonNull(list(nonNull('CleverpinSetting'))),
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByWithRelationInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CleverpinSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
