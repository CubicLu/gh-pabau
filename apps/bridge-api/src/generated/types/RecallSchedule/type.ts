import { objectType } from 'nexus'

export const RecallSchedule = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'RecallSchedule',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('recall_id')
    t.int('contact_id')
    t.int('date')
    t.field('scheduled_date', { type: 'DateTime' })
    t.string('notes')
    t.int('sms_sent')
    t.int('recalled_by')
    t.int('recalled_on')
    t.int('email_sent')
    t.int('deleted')
    t.int('booking_id')
    t.field('created_date', { type: 'DateTime' })
    t.field('updated_date', { type: 'DateTime' })
    t.nullable.int('error_code')
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.field('Recall', {
      type: 'Recall',
      resolve(root: any) {
        return root.Recall
      },
    })
  },
})
