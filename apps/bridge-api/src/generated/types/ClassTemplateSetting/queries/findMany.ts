import { queryField, nonNull, list } from 'nexus'

export const ClassTemplateSettingFindManyQuery = queryField(
  'findManyClassTemplateSetting',
  {
    type: nonNull(list(nonNull('ClassTemplateSetting'))),
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByWithRelationInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassTemplateSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classTemplateSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
