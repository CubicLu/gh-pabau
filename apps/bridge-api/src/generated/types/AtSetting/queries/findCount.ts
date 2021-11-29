import { queryField, nonNull, list } from 'nexus'

export const AtSettingFindCountQuery = queryField('findManyAtSettingCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByWithRelationInput'),
    cursor: 'AtSettingWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtSettingScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atSetting.count(args as any)
  },
})
