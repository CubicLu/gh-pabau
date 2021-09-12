import { objectType } from 'nexus'

export const Activity = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Activity',
  definition(t) {
    t.int('id')
    t.int('created_by')
    t.int('assigned_to')
    t.int('contact_id')
    t.int('lead_id')
    t.string('subject')
    t.nullable.string('note')
    t.boolean('available')
    t.string('status')
    t.field('due_start_date', { type: 'DateTime' })
    t.field('due_end_date', { type: 'DateTime' })
    t.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.nullable.field('finished_at', { type: 'DateTime' })
    t.int('type')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('CmLead', {
      type: 'CmLead',
      resolve(root: any) {
        return root.CmLead
      },
    })
    t.field('ActivityType', {
      type: 'ActivityType',
      resolve(root: any) {
        return root.ActivityType
      },
    })
    t.field('AssignedUser', {
      type: 'User',
      resolve(root: any) {
        return root.AssignedUser
      },
    })
  },
})