import { mutationField, nonNull } from 'nexus'

export const CleverpinSettingUpdateOneMutation = mutationField(
  'updateOneCleverpinSetting',
  {
    type: nonNull('CleverpinSetting'),
    args: {
      data: nonNull('CleverpinSettingUpdateInput'),
      where: nonNull('CleverpinSettingWhereUniqueInput'),
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
