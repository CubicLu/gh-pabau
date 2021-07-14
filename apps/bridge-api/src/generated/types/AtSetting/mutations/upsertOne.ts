import { mutationField, nonNull } from 'nexus'

export const AtSettingUpsertOneMutation = mutationField('upsertOneAtSetting', {
  type: nonNull('AtSetting'),
  args: {
    where: nonNull('AtSettingWhereUniqueInput'),
    create: nonNull('AtSettingCreateInput'),
    update: nonNull('AtSettingUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atSetting.upsert({
      ...args,
      ...select,
    })
  },
})
