import { queryField, list } from 'nexus'

export const ClinicalSoftwareFindFirstQuery = queryField(
  'findFirstClinicalSoftware',
  {
    type: 'ClinicalSoftware',
    args: {
      where: 'ClinicalSoftwareWhereInput',
      orderBy: list('ClinicalSoftwareOrderByWithRelationInput'),
      cursor: 'ClinicalSoftwareWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClinicalSoftwareScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clinicalSoftware.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
