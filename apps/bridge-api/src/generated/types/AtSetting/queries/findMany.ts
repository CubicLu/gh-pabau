import { queryField, nonNull, list } from 'nexus'

export const AtSettingFindManyQuery = queryField('findManyAtSetting', {
  type: nonNull(list(nonNull('AtSetting'))),
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByWithRelationInput'),
    cursor: 'AtSettingWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtSettingScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atSetting.findMany({
      ...args,
      ...select,
    })
  },
})
