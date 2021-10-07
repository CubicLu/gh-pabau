import { queryField, list } from 'nexus'

export const AtSettingFindFirstQuery = queryField('findFirstAtSetting', {
  type: 'AtSetting',
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByWithRelationInput'),
    cursor: 'AtSettingWhereUniqueInput',
    distinct: 'AtSettingScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atSetting.findFirst({
      ...args,
      ...select,
    })
  },
})
