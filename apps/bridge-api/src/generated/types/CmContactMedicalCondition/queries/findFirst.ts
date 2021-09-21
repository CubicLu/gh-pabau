import { queryField, list } from 'nexus'

export const CmContactMedicalConditionFindFirstQuery = queryField(
  'findFirstCmContactMedicalCondition',
  {
    type: 'CmContactMedicalCondition',
    args: {
      where: 'CmContactMedicalConditionWhereInput',
      orderBy: list('CmContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'CmContactMedicalConditionWhereUniqueInput',
      distinct: 'CmContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactMedicalCondition.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
