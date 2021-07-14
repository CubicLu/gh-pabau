import { queryField, list } from 'nexus'

export const ClassTemplateSettingFindFirstQuery = queryField(
  'findFirstClassTemplateSetting',
  {
    type: 'ClassTemplateSetting',
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      distinct: 'ClassTemplateSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classTemplateSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
