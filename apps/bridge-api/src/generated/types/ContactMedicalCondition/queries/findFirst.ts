import { queryField, list } from 'nexus'

export const ContactMedicalConditionFindFirstQuery = queryField(
  'findFirstContactMedicalCondition',
  {
    type: 'ContactMedicalCondition',
    args: {
      where: 'ContactMedicalConditionWhereInput',
      orderBy: list('ContactMedicalConditionOrderByWithRelationInput'),
      cursor: 'ContactMedicalConditionWhereUniqueInput',
      distinct: 'ContactMedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactMedicalCondition.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
