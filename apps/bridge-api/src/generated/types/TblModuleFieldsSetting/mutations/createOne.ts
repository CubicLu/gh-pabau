import { mutationField, nonNull } from 'nexus'

export const TblModuleFieldsSettingCreateOneMutation = mutationField(
  'createOneTblModuleFieldsSetting',
  {
    type: nonNull('TblModuleFieldsSetting'),
    args: {
      data: nonNull('TblModuleFieldsSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.tblModuleFieldsSetting.create({
        data,
        ...select,
      })
    },
  },
)
