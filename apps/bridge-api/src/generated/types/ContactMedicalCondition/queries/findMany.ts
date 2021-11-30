import { queryField, nonNull, list } from 'nexus'

export const ContactMedicalConditionFindManyQuery = queryField(
  'findManyContactMedicalCondition',
  {
    type: nonNull(list(nonNull('ContactMedicalCondition'))),
    args: {
      where: 'ContactMedicalConditionWhereInput',
      orderBy: list('ContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'ContactMedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactMedicalConditionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactMedicalCondition.findMany({
        ...args,
        ...select,
      })
    },
  },
)
