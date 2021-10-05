import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceCreateOneMutation = mutationField(
  'createOneInsuranceContractPrice',
  {
    type: nonNull('InsuranceContractPrice'),
    args: {
      data: nonNull('InsuranceContractPriceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.insuranceContractPrice.create({
        data,
        ...select,
      })
    },
  },
)
