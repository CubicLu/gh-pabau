import { queryField, nonNull } from 'nexus'

export const ClientFormSettingFindUniqueQuery = queryField(
  'findUniqueClientFormSetting',
  {
    type: 'ClientFormSetting',
    args: {
      where: nonNull('ClientFormSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.clientFormSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
