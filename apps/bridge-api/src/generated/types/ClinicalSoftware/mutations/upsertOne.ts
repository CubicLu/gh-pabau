import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareUpsertOneMutation = mutationField(
  'upsertOneClinicalSoftware',
  {
    type: nonNull('ClinicalSoftware'),
    args: {
      where: nonNull('ClinicalSoftwareWhereUniqueInput'),
      create: nonNull('ClinicalSoftwareCreateInput'),
      update: nonNull('ClinicalSoftwareUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clinicalSoftware.upsert({
        ...args,
        ...select,
      })
    },
  },
)
