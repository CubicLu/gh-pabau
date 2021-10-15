import { queryField, list } from 'nexus'

export const CmContactMedicalConditionAggregateQuery = queryField(
  'aggregateCmContactMedicalCondition',
  {
    type: 'AggregateCmContactMedicalCondition',
    args: {
      where: 'CmContactMedicalConditionWhereInput',
      orderBy: list('CmContactMedicalConditionOrderByInput'),
      cursor: 'CmContactMedicalConditionWhereUniqueInput',
      distinct: 'CmContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactMedicalCondition.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
