import { queryField, list } from 'nexus'

export const ClientFormSettingFindFirstQuery = queryField(
  'findFirstClientFormSetting',
  {
    type: 'ClientFormSetting',
    args: {
      where: 'ClientFormSettingWhereInput',
      orderBy: list('ClientFormSettingOrderByWithRelationInput'),
      cursor: 'ClientFormSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClientFormSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clientFormSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
