// import { extendType, objectType } from 'nexus'
// import { Context } from '../../../context'
// import { findAllDuplicates } from '../merge-contact.service'

// export const DuplicateContactResponse = objectType({
//   name: 'DuplicateContactResponse',
//   definition(t) {
//     t.nonNull.field('first', { type: 'CmContact' })
//     t.nonNull.field('second', { type: 'CmContact' })
//   },
// })

// export const duplicateContact = extendType({
//   type: 'Query',
//   definition(t) {
//     t.list.field('findManyDuplicateContacts', {
//       type: 'DuplicateContactResponse',
//       async resolve(_root, input, ctx: Context, info) {
//         const duplicateData = await findAllDuplicates(ctx)
//         console.log(
//           'duplicate contact data response---------',
//           duplicateData[0]
//         )
//         return duplicateData
//       },
//     })
//   },
// })
