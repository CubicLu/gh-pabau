import { queryField, list } from 'nexus'

export const MedicalFormContactFindFirstQuery = queryField(
  'findFirstMedicalFormContact',
  {
    type: 'MedicalFormContact',
    args: {
      where: 'MedicalFormContactWhereInput',
      orderBy: list('MedicalFormContactOrderByWithRelationInput'),
      cursor: 'MedicalFormContactWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormContactScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContact.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
