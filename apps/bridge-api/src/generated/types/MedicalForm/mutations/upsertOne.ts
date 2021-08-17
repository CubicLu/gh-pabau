import { mutationField, nonNull } from 'nexus'

export const MedicalFormUpsertOneMutation = mutationField(
  'upsertOneMedicalForm',
  {
    type: nonNull('MedicalForm'),
    args: {
      where: nonNull('MedicalFormWhereUniqueInput'),
      create: nonNull('MedicalFormCreateInput'),
      update: nonNull('MedicalFormUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalForm.upsert({
        ...args,
        ...select,
      })
    },
  },
)
