import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingUpdateOneMutation = mutationField(
  'updateOneCleverpinSetting',
  {
    type: nonNull('CleverpinSetting'),
    args: {
      where: nonNull('CleverpinSettingWhereUniqueInput'),
      data: nonNull('CleverpinSettingUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cleverpinSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
