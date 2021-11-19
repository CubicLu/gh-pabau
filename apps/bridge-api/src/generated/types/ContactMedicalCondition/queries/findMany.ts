import { queryField, nonNull, list } from 'nexus'

export const ContactMedicalConditionFindManyQuery = queryField(
  'findManyContactMedicalCondition',
  {
    type: nonNull(list(nonNull('ContactMedicalCondition'))),
    args: {
      where: 'ContactMedicalConditionWhereInput',
      orderBy: list('ContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'ContactMedicalConditionWhereUniqueInput',
      distinct: 'ContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactMedicalCondition.findMany({
        ...args,
        ...select,
      })
    },
  },
)
