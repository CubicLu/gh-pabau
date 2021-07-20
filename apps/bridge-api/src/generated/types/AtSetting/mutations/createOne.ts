import { mutationField, nonNull } from 'nexus'

export const AtSettingCreateOneMutation = mutationField('createOneAtSetting', {
  type: nonNull('AtSetting'),
  args: {
    data: nonNull('AtSettingCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.atSetting.create({
      data,
      ...select,
    })
  },
})
