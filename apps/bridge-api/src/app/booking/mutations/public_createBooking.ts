import {
  extendType,
  inputObjectType,
  nullable,
  objectType,
  list,
  intArg,
} from 'nexus'
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
    t.nonNull.int('contact_id')
    t.nonNull.float('start_date')
    t.nonNull.float('end_date')
    t.nonNull.int('user_id')
    t.nonNull.int('service_id')
    t.nonNull.list.nonNull.field('service_ids', {
      type: 'Int',
    })
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
      async resolve(_, input, ctx: Context) {
        // const service = ctx.prisma.companyService.findFirst({
        //   where: { id: input.data.service_id },
        // })

        // await ctx.prisma.booking.create({
        //   data: {
        //     title: 'Missing Title',
        //     start_date: input.data.start_date,
        //     end_date: input.data.end_date,
        //     service: 'Missing Service',
        //     contact_id: input.data.contact_id,
        //     UID: input.data.user_id,
        //     company_id: 8021,
        //     backgroundcolor: 'magenta-v1',
        //   },
        // })

        return {
          id: 100,
        }
      },
    })
  },
})
