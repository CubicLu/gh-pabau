import { extendType, objectType, list } from 'nexus'
import { Context } from '../../../context'
import { findAllDuplicates } from '../merge-contact.service'

export const DuplicateContactResponse = objectType({
  name: 'DuplicateContactResponse',
  definition(t) {
    t.nonNull.field('first', { type: 'CmContact' })
    t.nonNull.field('second', { type: 'CmContact' })
  },
})

export const duplicateContact = extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyDuplicateContacts', {
      type: list('DuplicateContactResponse'),
      async resolve(_root, input, ctx: Context, info) {
        const duplicateData = await findAllDuplicates(ctx)
        return duplicateData
      },
    })
  },
})
