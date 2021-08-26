import { list, extendType } from 'nexus'
import { Context } from '../../context'
import ContactService from '../../app/contact/ContactService'

export const duplicateContacts = extendType({
  type: 'Query',
  definition(t) {
    t.field('duplicateContacts', {
      type: list(list('CmContact')),
      async resolve(_root, args, ctx: Context) {
        const contactHandler = await new ContactService(ctx).findAllDuplicates()
        console.log('contactHandler', contactHandler)
        return contactHandler
      },
    })
  },
})
