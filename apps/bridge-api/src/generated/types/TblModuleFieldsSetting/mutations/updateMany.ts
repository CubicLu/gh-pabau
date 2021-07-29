import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingUpdateManyMutation = mutationField(
  'updateManyTblModuleFieldsSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'TblModuleFieldsSettingWhereInput',
      data: nonNull('TblModuleFieldsSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.tblModuleFieldsSetting.updateMany(args as any)
    },
  },
)
