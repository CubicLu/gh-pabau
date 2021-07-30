import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingUpdateOneMutation = mutationField(
  'updateOneTblModuleFieldsSetting',
  {
    type: nonNull('TblModuleFieldsSetting'),
    args: {
      where: nonNull('TblModuleFieldsSettingWhereUniqueInput'),
      data: nonNull('TblModuleFieldsSettingUpdateInput'),
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
