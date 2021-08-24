import { queryField, nonNull } from 'nexus'

export const AtSettingFindUniqueQuery = queryField('findUniqueAtSetting', {
  type: 'AtSetting',
  args: {
    where: nonNull('AtSettingWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.atSetting.findUnique({
      where,
      ...select,
    })
  },
})
