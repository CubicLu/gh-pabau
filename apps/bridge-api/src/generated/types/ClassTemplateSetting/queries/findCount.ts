import { queryField, nonNull, list } from 'nexus'

export const ClassTemplateSettingFindCountQuery = queryField(
  'findManyClassTemplateSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassTemplateSettingWhereInput',
      orderBy: list('ClassTemplateSettingOrderByWithRelationInput'),
      cursor: 'ClassTemplateSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassTemplateSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classTemplateSetting.count(args as any)
    },
  },
)
