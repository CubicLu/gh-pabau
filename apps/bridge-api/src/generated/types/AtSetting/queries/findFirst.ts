import { queryField, list } from 'nexus'

export const AtSettingFindFirstQuery = queryField('findFirstAtSetting', {
  type: 'AtSetting',
  args: {
    where: 'AtSettingWhereInput',
    orderBy: list('AtSettingOrderByWithRelationInput'),
    cursor: 'AtSettingWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtSettingScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atSetting.findFirst({
      ...args,
      ...select,
    })
  },
})
