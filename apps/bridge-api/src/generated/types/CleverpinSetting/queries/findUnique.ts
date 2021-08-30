import { queryField, nonNull } from 'nexus'

export const CleverpinSettingFindUniqueQuery = queryField(
  'findUniqueCleverpinSetting',
  {
    type: 'CleverpinSetting',
    args: {
      where: nonNull('CleverpinSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cleverpinSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
