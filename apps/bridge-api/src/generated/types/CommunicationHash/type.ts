import { objectType } from 'nexus'

export const CommunicationHash = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CommunicationHash',
  definition(t) {
    t.int('id')
    t.int('comm_recipient_id')
    t.string('hash')
    t.field('Recipients', {
      type: 'CommunicationRecipient',
      resolve(root: any) {
        return root.Recipients
      },
    })
  },
})
