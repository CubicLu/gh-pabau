import { objectType } from 'nexus'

export const RotaShift = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'RotaShift',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.decimal('start')
    t.decimal('end')
    t.int('company_id')
    t.nullable.string('notes')
    t.nullable.field('last_seen', { type: 'DateTime' })
    t.nullable.field('last_modified', { type: 'DateTime' })
    t.nullable.field('last_notified', { type: 'DateTime' })
    t.nullable.field('last_published', { type: 'DateTime' })
    t.field('first_created', { type: 'DateTime' })
    t.int('user_created')
    t.nullable.int('repeat_id')
    t.nullable.string('reason_code')
    t.nullable.string('reason_data')
    t.int('holiday_id')
    t.nullable.int('cal_id')
    t.int('is_cal')
    t.string('note_color')
    t.int('location_id')
    t.nullable.int('request')
    t.nullable.int('sickness')
    t.int('imported')
    t.string('tag_name')
    t.int('room_id')
    t.boolean('force_created')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
    t.field('CompanyRoom', {
      type: 'CompanyRoom',
      resolve(root: any) {
        return root.CompanyRoom
      },
    })
    t.field('HolidayRequest', {
      type: 'HolidayRequest',
      resolve(root: any) {
        return root.HolidayRequest
      },
    })
    t.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
  },
})
