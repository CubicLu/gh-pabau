import { queryField, nonNull } from 'nexus'

export const ClassTemplateSettingFindUniqueQuery = queryField(
  'findUniqueClassTemplateSetting',
  {
    type: 'ClassTemplateSetting',
    args: {
      where: nonNull('ClassTemplateSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.classTemplateSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
