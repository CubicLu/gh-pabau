import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareUpdateOneMutation = mutationField(
  'updateOneClinicalSoftware',
  {
    type: nonNull('ClinicalSoftware'),
    args: {
      where: nonNull('ClinicalSoftwareWhereUniqueInput'),
      data: nonNull('ClinicalSoftwareUpdateInput'),
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
