import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyCreateOneMutation = mutationField(
  'createOneIssuingCompany',
  {
    type: nonNull('IssuingCompany'),
    args: {
      data: nonNull('IssuingCompanyCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.issuingCompany.create({
        data,
        ...select,
      })
    },
  },
)
