import { queryField, list } from 'nexus'

export const ClassTemplateSettingAggregateQuery = queryField(
  'aggregateClassTemplateSetting',
  {
    type: 'AggregateClassTemplateSetting',
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      distinct: 'ClassTemplateSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classTemplateSetting.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
