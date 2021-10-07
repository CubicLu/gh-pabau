import { objectType } from 'nexus'

export const ClassMaster = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ClassMaster',
  definition(t) {
    t.int('c_id')
    t.nullable.int('c_companyid')
    t.nullable.int('c_type')
    t.nullable.int('c_teacher')
    t.nullable.int('c_location')
    t.nullable.int('c_room')
    t.nullable.string('c_slots')
    t.nullable.float('c_price')
    t.nullable.string('c_date')
    t.nullable.string('c_time')
    t.nullable.string('c_duration')
    t.nullable.string('c_day')
    t.nullable.string('c_exptime')
    t.nullable.string('c_book')
    t.nullable.string('c_empty')
    t.nullable.string('c_formattime')
    t.nullable.string('c_startformattime')
    t.nullable.field('class_pay', { type: 'class_master_class_pay' })
    t.int('cancel_status')
    t.int('product_id')
    t.string('sign_in_type')
  },
})
