import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingUpdateOneMutation = mutationField(
  'updateOneClassTemplateSetting',
  {
    type: nonNull('ClassTemplateSetting'),
    args: {
      data: nonNull('ClassTemplateSettingUpdateInput'),
      where: nonNull('ClassTemplateSettingWhereUniqueInput'),
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
