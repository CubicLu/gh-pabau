import { mutationField, nonNull, intArg } from 'nexus'
import { Context } from '../../../context'
import { modifyLabel } from '../label'

export const updateContactLable = mutationField('updateContactLable', {
  type: 'Boolean',
  args: {
    contactId: nonNull(intArg()),
    labels: 'UpdateContactLabelType',
  },
  async resolve(_root, input, ctx: Context) {
    await modifyLabel(input.contactId, input?.labels, ctx)

    return true
  },
})
