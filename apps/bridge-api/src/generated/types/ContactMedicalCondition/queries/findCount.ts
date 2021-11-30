import { queryField, nonNull, list } from 'nexus'

export const ContactMedicalConditionFindCountQuery = queryField(
  'findManyContactMedicalConditionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactMedicalConditionWhereInput',
      orderBy: list('ContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'ContactMedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactMedicalConditionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMedicalCondition.count(args as any)
    },
  },
)
