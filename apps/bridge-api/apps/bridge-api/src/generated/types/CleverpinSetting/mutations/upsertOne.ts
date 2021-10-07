import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingUpsertOneMutation = mutationField(
  'upsertOneCleverpinSetting',
  {
    type: nonNull('CleverpinSetting'),
    args: {
      where: nonNull('CleverpinSettingWhereUniqueInput'),
      create: nonNull('CleverpinSettingCreateInput'),
      update: nonNull('CleverpinSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cleverpinSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)
