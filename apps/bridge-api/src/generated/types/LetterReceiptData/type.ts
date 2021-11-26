import { objectType } from 'nexus'

export const LetterReceiptData = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LetterReceiptData',
  definition(t) {
    t.int('id')
    t.int('communication_id')
    t.nullable.string('recipient_data')
    t.string('letter_body')
    t.int('invoice_id')
    t.nullable.field('Communication', {
      type: 'Communication',
      resolve(root: any) {
        return root.Communication
      },
    })
  },
})
