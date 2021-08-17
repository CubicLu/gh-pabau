import { queryField, nonNull } from 'nexus'

export const ClinicalSoftwareFindUniqueQuery = queryField(
  'findUniqueClinicalSoftware',
  {
    type: 'ClinicalSoftware',
    args: {
      where: nonNull('ClinicalSoftwareWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.clinicalSoftware.findUnique({
        where,
        ...select,
      })
    },
  },
)
