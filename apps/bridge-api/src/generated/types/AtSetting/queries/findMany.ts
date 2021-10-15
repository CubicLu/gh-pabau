import { queryField, nonNull, list } from 'nexus'

export const AtSettingFindManyQuery = queryField('findManyAtSetting', {
  type: nonNull(list(nonNull('AtSetting'))),
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByInput'),
    cursor: 'AtSettingWhereUniqueInput',
    distinct: 'AtSettingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atSetting.findMany({
      ...args,
      ...select,
    })
  },
})
