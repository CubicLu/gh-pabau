import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingUpdateOneMutation = mutationField(
  'updateOneClassTemplateSetting',
  {
    type: nonNull('ClassTemplateSetting'),
    args: {
      where: nonNull('ClassTemplateSettingWhereUniqueInput'),
      data: nonNull('ClassTemplateSettingUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classTemplateSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
