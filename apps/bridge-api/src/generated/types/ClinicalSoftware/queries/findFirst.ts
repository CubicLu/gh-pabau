import { queryField, list } from 'nexus'

export const ClinicalSoftwareFindFirstQuery = queryField(
  'findFirstClinicalSoftware',
  {
    type: 'ClinicalSoftware',
    args: {
      where: 'ClinicalSoftwareWhereInput',
      orderBy: list('ClinicalSoftwareOrderByInput'),
      cursor: 'ClinicalSoftwareWhereUniqueInput',
      distinct: 'ClinicalSoftwareScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clinicalSoftware.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
