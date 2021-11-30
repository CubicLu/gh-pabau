import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareUpdateOneMutation = mutationField(
  'updateOneClinicalSoftware',
  {
    type: nonNull('ClinicalSoftware'),
    args: {
      data: nonNull('ClinicalSoftwareUpdateInput'),
      where: nonNull('ClinicalSoftwareWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.clinicalSoftware.update({
        where,
        data,
        ...select,
      })
    },
  },
)
