import { queryField, nonNull, list } from 'nexus'

export const ContactMedicalConditionFindCountQuery = queryField(
  'findManyContactMedicalConditionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactMedicalConditionWhereInput',
      orderBy: list('ContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'ContactMedicalConditionWhereUniqueInput',
      distinct: 'ContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMedicalCondition.count(args as any)
    },
  },
)
