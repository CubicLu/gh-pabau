import { queryField, nonNull, list } from 'nexus'

export const CleverpinSettingFindCountQuery = queryField(
  'findManyCleverpinSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByWithRelationInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CleverpinSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cleverpinSetting.count(args as any)
    },
  },
)
