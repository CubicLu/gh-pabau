import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareCreateOneMutation = mutationField(
  'createOneClinicalSoftware',
  {
    type: nonNull('ClinicalSoftware'),
    args: {
      data: nonNull('ClinicalSoftwareCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.clinicalSoftware.create({
        data,
        ...select,
      })
    },
  },
)
