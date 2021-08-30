import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingCreateOneMutation = mutationField(
  'createOneCleverpinSetting',
  {
    type: nonNull('CleverpinSetting'),
    args: {
      data: nonNull('CleverpinSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cleverpinSetting.create({
        data,
        ...select,
      })
    },
  },
)
