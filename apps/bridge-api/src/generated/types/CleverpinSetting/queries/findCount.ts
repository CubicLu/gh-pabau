import { queryField, nonNull, list } from 'nexus'

export const CleverpinSettingFindCountQuery = queryField(
  'findManyCleverpinSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      distinct: 'CleverpinSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cleverpinSetting.count(args as any)
    },
  },
)
