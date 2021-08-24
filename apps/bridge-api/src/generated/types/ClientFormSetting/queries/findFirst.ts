import { queryField, list } from 'nexus'

export const ClientFormSettingFindFirstQuery = queryField(
  'findFirstClientFormSetting',
  {
    type: 'ClientFormSetting',
    args: {
      where: 'ClientFormSettingWhereInput',
      orderBy: list('ClientFormSettingOrderByInput'),
      cursor: 'ClientFormSettingWhereUniqueInput',
      distinct: 'ClientFormSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clientFormSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
