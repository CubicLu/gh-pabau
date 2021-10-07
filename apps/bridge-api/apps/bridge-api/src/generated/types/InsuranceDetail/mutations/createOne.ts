import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailCreateOneMutation = mutationField(
  'createOneInsuranceDetail',
  {
    type: nonNull('InsuranceDetail'),
    args: {
      data: nonNull('InsuranceDetailCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.insuranceDetail.create({
        data,
        ...select,
      })
    },
  },
)
