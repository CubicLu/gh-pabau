import { extendType, inputObjectType, nullable, objectType } from 'nexus'
import { Context } from '../../../context'
import { getTier } from '../../service/service-tiers'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const PublicCreateBookingResponse = objectType({
  name: 'public_createBookingResponse',
  definition(t) {
    t.boolean('success')
  },
})

const PCBData = inputObjectType({
  name: 'PCBData',
  definition(t) {
    t.nonNull.float('start_date')
    t.nonNull.float('end_date')
    t.nonNull.int('user_id')
    t.nonNull.int('location_id')
    t.nonNull.int('company_id')
    t.nonNull.list.nonNull.field('service_ids', {
      type: 'Int',
    })
  },
})

const PCBContact = inputObjectType({
  name: 'PCBContact',
  definition(t) {
    t.int('id')
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
        contact: nullable(PCBContact),
      },
      async resolve(_, input, ctx: Context) {
        const serviceTiers = await getTier(
          input.data.service_ids,
          input.data.user_id,
          input.data.location_id,
          ctx
        )

        const services = await ctx.prisma.companyService.findMany({
          where: { id: { in: input.data.service_ids } },
        })

        const insertData = []
        for (const s of input.data.service_ids) {
          const service = services.find((serv) => serv.id === s)
          insertData.push({
            title: 'Online Booking',
            start_date: input.data.start_date,
            end_date: input.data.end_date,
            service: service.name,
            UID: input.data.user_id,
            company_id: input.data.company_id,
            create_date: Number.parseInt(moment().format('YYYYMMDDHHmmss')),
            status: 'Waiting',
            estimated_cost: serviceTiers[s].cost,
            room_id: 0,
            unique_id: uuidv4(),
            Online: 1,
            service_id: s,
            sent_sms: 1,
            sent_email: 1,
            location_id: input.data.location_id,
            tips: 0,
            where: '',
          })
        }

        const res = await ctx.prisma.cmContact.update({
          where: { ID: input.contact.id },
          data: {
            Booking: {
              create: insertData,
            },
          },
        })

        console.log('REsult Log', res)

        return {
          success: true,
        }
      },
    })
  },
})
