import { objectType } from 'nexus'

export const CompanyRoomLocation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyRoomLocation',
  definition(t) {
    t.int('id')
    t.int('room_id')
    t.int('location_id')
    t.field('CompanyRoom', {
      type: 'CompanyRoom',
      resolve(root: any) {
        return root.CompanyRoom
      },
    })
    t.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
  },
})
