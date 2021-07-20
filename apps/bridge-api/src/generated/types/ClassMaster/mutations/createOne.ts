import { mutationField, nonNull } from 'nexus'

export const ClassMasterCreateOneMutation = mutationField(
  'createOneClassMaster',
  {
    type: nonNull('ClassMaster'),
    args: {
      data: nonNull('ClassMasterCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classMaster.create({
        data,
        ...select,
      })
    },
  },
)
