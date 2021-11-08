import { mutationField, nonNull } from 'nexus'

export const LabRequestCreateOneMutation = mutationField(
  'createOneLabRequest',
  {
    type: nonNull('LabRequest'),
    args: {
      data: nonNull('LabRequestCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.labRequest.create({
        data,
        ...select,
      })
    },
  },
)
