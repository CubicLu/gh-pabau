import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactCreateOneMutation = mutationField(
  'createOneMedicalFormContact',
  {
    type: nonNull('MedicalFormContact'),
    args: {
      data: nonNull('MedicalFormContactCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalFormContact.create({
        data,
        ...select,
      })
    },
  },
)
