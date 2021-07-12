import { queryField, list } from 'nexus'

export const MedicalFormContactFindFirstQuery = queryField(
  'findFirstMedicalFormContact',
  {
    type: 'MedicalFormContact',
    args: {
      where: 'MedicalFormContactWhereInput',
      orderBy: list('MedicalFormContactOrderByInput'),
      cursor: 'MedicalFormContactWhereUniqueInput',
      distinct: 'MedicalFormContactScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContact.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
