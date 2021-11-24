import { objectType } from 'nexus'

export const CompanyRoomService = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyRoomService',
  definition(t) {
    t.int('id')
    t.int('room_id')
    t.int('service_id')
    t.int('company_id')
    t.int('priority_order')
    t.int('imported')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Room', {
      type: 'CompanyRoom',
      resolve(root: any) {
        return root.Room
      },
    })
    t.nullable.field('Service', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.Service
      },
    })
  },
})
