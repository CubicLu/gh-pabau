import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingUpsertOneMutation = mutationField(
  'upsertOneTblModuleFieldsSetting',
  {
    type: nonNull('TblModuleFieldsSetting'),
    args: {
      where: nonNull('TblModuleFieldsSettingWhereUniqueInput'),
      create: nonNull('TblModuleFieldsSettingCreateInput'),
      update: nonNull('TblModuleFieldsSettingUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.upsert({
        ...args,
        ...select,
      })
    },
  },
)
