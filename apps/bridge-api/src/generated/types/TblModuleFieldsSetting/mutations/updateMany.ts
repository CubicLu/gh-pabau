import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingUpdateManyMutation = mutationField(
  'updateManyTblModuleFieldsSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('TblModuleFieldsSettingUpdateManyMutationInput'),
      where: 'TblModuleFieldsSettingWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.tblModuleFieldsSetting.updateMany(args as any)
    },
  },
)
