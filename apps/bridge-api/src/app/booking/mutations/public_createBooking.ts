import { extendType, inputObjectType, nullable, objectType } from 'nexus'
import { Context } from '../../../context'

const PublicCreateBookingResponse = objectType({
  name: 'public_createBookingResponse',
  definition(t) {
    t.int('id')
  },
})

const PCBData = inputObjectType({
  name: 'PCBData',
  definition(t) {
    t.nonNull.int('company_id')
    t.nonNull.float('start_date')
    t.nonNull.float('end_date')
    t.nonNull.int('uid')
  },
})

export const public_createBooking = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('public_createBooking', {
      type: PublicCreateBookingResponse,
      description: 'Create booking from public',
      args: {
        data: nullable(PCBData),
      },
      resolve(_, input, ctx: Context) {
        return {
          id: 100,
        }
      },
    })
  },
})
