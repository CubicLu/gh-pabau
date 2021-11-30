import { queryField, list } from 'nexus'

export const ContactMedicalConditionAggregateQuery = queryField(
  'aggregateContactMedicalCondition',
  {
    type: 'AggregateContactMedicalCondition',
    args: {
      where: 'ContactMedicalConditionWhereInput',
      orderBy: list('ContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'ContactMedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactMedicalCondition.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
