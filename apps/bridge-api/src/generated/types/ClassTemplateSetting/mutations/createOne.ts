import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingCreateOneMutation = mutationField(
  'createOneClassTemplateSetting',
  {
    type: nonNull('ClassTemplateSetting'),
    args: {
      data: nonNull('ClassTemplateSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classTemplateSetting.create({
        data,
        ...select,
      })
    },
  },
)
