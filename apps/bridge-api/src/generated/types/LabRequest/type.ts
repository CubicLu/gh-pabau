import { objectType } from 'nexus'

export const LabRequest = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LabRequest',
  definition(t) {
    t.int('id')
    t.int('contact_id')
    t.int('company_id')
    t.field('request_date', { type: 'DateTime' })
    t.field('last_update', { type: 'DateTime' })
    t.int('request_by_id')
    t.int('request_status')
    t.string('request_lab_id')
    t.int('lab_id')
    t.int('request_id')
    t.int('received_id')
    t.int('communication_id')
    t.nullable.string('send_result')
    t.nullable.string('receive_result')
    t.nullable.string('receive_raw')
    t.field('receive_date', { type: 'DateTime' })
    t.field('sent_date', { type: 'DateTime' })
    t.nullable.int('assigned_to')
    t.nullable.field('report_viewed', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.field('RequestUser', {
      type: 'User',
      resolve(root: any) {
        return root.RequestUser
      },
    })
    t.nullable.field('AssignedUser', {
      type: 'User',
      resolve(root: any) {
        return root.AssignedUser
      },
    })
    t.field('Lab', {
      type: 'Lab',
      resolve(root: any) {
        return root.Lab
      },
    })
    t.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
  },
})
