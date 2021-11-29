import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingUpdateOneMutation = mutationField(
  'updateOneTblModuleFieldsSetting',
  {
    type: nonNull('TblModuleFieldsSetting'),
    args: {
      data: nonNull('TblModuleFieldsSettingUpdateInput'),
      where: nonNull('TblModuleFieldsSettingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
