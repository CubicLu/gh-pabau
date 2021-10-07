import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterCreateOneMutation = mutationField(
  'createOneClasstypeMaster',
  {
    type: nonNull('ClasstypeMaster'),
    args: {
      data: nonNull('ClasstypeMasterCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classtypeMaster.create({
        data,
        ...select,
      })
    },
  },
)
