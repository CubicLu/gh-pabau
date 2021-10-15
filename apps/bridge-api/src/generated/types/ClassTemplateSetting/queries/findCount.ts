import { queryField, nonNull, list } from 'nexus'

export const ClassTemplateSettingFindCountQuery = queryField(
  'findManyClassTemplateSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      distinct: 'ClassTemplateSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classTemplateSetting.count(args as any)
    },
  },
)
