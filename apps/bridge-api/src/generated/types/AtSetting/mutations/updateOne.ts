import { mutationField, nonNull } from 'nexus'

export const AtSettingUpdateOneMutation = mutationField('updateOneAtSetting', {
  type: nonNull('AtSetting'),
  args: {
    where: nonNull('AtSettingWhereUniqueInput'),
    data: nonNull('AtSettingUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.atSetting.update({
      where,
      data,
      ...select,
    })
  },
})
