import { mutationField, nonNull } from 'nexus'

export const CmContactCreateOneMutation = mutationField('createOneCmContact', {
  type: nonNull('CmContact'),
  args: {
    data: nonNull('CmContactCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cmContact.create({
      data,
      ...select,
    })
  },
})
