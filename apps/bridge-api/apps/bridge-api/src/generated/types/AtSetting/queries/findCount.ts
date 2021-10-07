import { queryField, nonNull, list } from 'nexus'

export const AtSettingFindCountQuery = queryField('findManyAtSettingCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByWithRelationInput'),
    cursor: 'AtSettingWhereUniqueInput',
    distinct: 'AtSettingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atSetting.count(args as any)
  },
})
