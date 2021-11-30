import { queryField, list } from 'nexus'

export const CleverpinSettingFindFirstQuery = queryField(
  'findFirstCleverpinSetting',
  {
    type: 'CleverpinSetting',
    args: {
      where: 'CleverpinSettingWhereInput',
      orderBy: list('CleverpinSettingOrderByWithRelationInput'),
      cursor: 'CleverpinSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CleverpinSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
