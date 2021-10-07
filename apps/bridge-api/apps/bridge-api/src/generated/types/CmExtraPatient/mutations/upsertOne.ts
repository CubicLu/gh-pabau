import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientUpsertOneMutation = mutationField(
  'upsertOneCmExtraPatient',
  {
    type: nonNull('CmExtraPatient'),
    args: {
      where: nonNull('CmExtraPatientWhereUniqueInput'),
      create: nonNull('CmExtraPatientCreateInput'),
      update: nonNull('CmExtraPatientUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraPatient.upsert({
        ...args,
        ...select,
      })
    },
  },
)
