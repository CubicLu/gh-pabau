import { queryField, nonNull, list } from 'nexus'

export const ClassTemplateSettingFindManyQuery = queryField(
  'findManyClassTemplateSetting',
  {
    type: nonNull(list(nonNull('ClassTemplateSetting'))),
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      distinct: 'ClassTemplateSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classTemplateSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
