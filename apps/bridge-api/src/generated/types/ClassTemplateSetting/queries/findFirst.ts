import { queryField, list } from 'nexus'

export const ClassTemplateSettingFindFirstQuery = queryField(
  'findFirstClassTemplateSetting',
  {
    type: 'ClassTemplateSetting',
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByWithRelationInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassTemplateSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classTemplateSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
