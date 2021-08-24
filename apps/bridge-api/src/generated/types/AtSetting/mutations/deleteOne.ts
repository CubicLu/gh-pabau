import { mutationField, nonNull } from 'nexus'

export const AtSettingDeleteOneMutation = mutationField('deleteOneAtSetting', {
  type: 'AtSetting',
  args: {
    where: nonNull('AtSettingWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.atSetting.delete({
      where,
      ...select,
    })
  },
})
