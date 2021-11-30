import { mutationField, nonNull } from 'nexus'

export const AtSettingUpdateOneMutation = mutationField('updateOneAtSetting', {
  type: nonNull('AtSetting'),
  args: {
    data: nonNull('AtSettingUpdateInput'),
    where: nonNull('AtSettingWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.atSetting.update({
      where,
      data,
      ...select,
    })
  },
})
