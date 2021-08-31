import { queryField, list } from 'nexus'

export const CleverpinSettingFindFirstQuery = queryField(
  'findFirstCleverpinSetting',
  {
    type: 'CleverpinSetting',
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByWithRelationInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      distinct: 'CleverpinSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
