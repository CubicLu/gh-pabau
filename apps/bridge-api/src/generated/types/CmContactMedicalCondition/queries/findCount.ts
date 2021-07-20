import { queryField, nonNull, list } from 'nexus'

export const CmContactMedicalConditionFindCountQuery = queryField(
  'findManyCmContactMedicalConditionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactMedicalConditionWhereInput',
      orderBy: list('CmContactMedicalConditionOrderByInput'),
      cursor: 'CmContactMedicalConditionWhereUniqueInput',
      distinct: 'CmContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactMedicalCondition.count(args as any)
    },
  },
)
