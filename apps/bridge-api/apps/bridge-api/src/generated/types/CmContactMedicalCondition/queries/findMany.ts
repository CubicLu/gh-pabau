import { queryField, nonNull, list } from 'nexus'

export const CmContactMedicalConditionFindManyQuery = queryField(
  'findManyCmContactMedicalCondition',
  {
    type: nonNull(list(nonNull('CmContactMedicalCondition'))),
    args: {
      where: 'CmContactMedicalConditionWhereInput',
      orderBy: list('CmContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'CmContactMedicalConditionWhereUniqueInput',
      distinct: 'CmContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactMedicalCondition.findMany({
        ...args,
        ...select,
      })
    },
  },
)
