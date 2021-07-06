import {
  mutationField,
  inputObjectType,
  list,
  nonNull,
  intArg,
  extendType,
} from 'nexus'
import { Context } from '../../context'
import ContactService from '../../app/contact/ContactService'
import { CmContact } from '@prisma/client'

// export const duplicateContacts = extendType({
//   type: 'Query',
//   definition(t) {
//     t.list.field('duplicateContacts', {
//       type: 'String',
//       async resolve(ctx: Context) {
//         // TODO: Get all Clients
//         const allContacts = ctx.prisma.cmContact.findMany()
//         // const findSimilar = new FindDuplcatesService(allContacts ili ctx)
//         // TODO: Looop through clients array and find similar patient   details
//         // TODO: Return duplicates as pairs or multiple person groups
//         // TODO: Map the response and return the mapped array
//         return 'random text'
//       },
//     })
//   },
// })

// export type DuplicateCmContact = {
//   duplicateContacts: CmContact[]
// }

// export const CmContactMergeMutation = mutationField('duplicateContacts', {
//   type: list(list('CmContact')),
//
//   async resolve(_root, args, ctx: Context) {
//     const contact = new ContactService(ctx)
//     const contactHandler = await new ContactService(ctx).findAllDuplicates()
//
//     return contactHandler
//   },
// })

// export const CmContactMergeMutation = extendType({
//   type: list(list('CmContact')),
//   definition(t) {
//     t.field('duplicateContacts', {
//       // type: list(list('CmContact')),
//       async resolve(ctx: Context) {
//         const contact = new ContactService(ctx)
//         const contactHandler = await new ContactService(ctx).findAllDuplicates()
//         return contactHandler
//       },
//     })
//   },
// })

export const duplicateContacts = extendType({
  type: 'Query',
  definition(t) {
    t.field('duplicateContacts', {
      type: list(list('CmContact')),
      async resolve(_root, args, ctx: Context) {
        const contactHandler = await new ContactService(ctx).findAllDuplicates()
        return contactHandler
      },
    })
  },
})
