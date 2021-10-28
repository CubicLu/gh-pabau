import { extendType, inputObjectType, nullable, objectType } from 'nexus'
import { Context } from '../../../context'
import { getTier } from '../../service/service-tiers'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { hhmmToMinutes } from '../../../../libs/datetime'

const PublicCreateBookingResponse = objectType({
  name: 'public_createBookingResponse',
  definition(t) {
    t.boolean('success')
  },
})

const PCBData = inputObjectType({
  name: 'PCBData',
  definition(t) {
    t.nonNull.field('start_date', { type: 'DateTime' })
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
    t.int('contact_id')
    t.string('first_name')
    t.string('last_name')
    t.string('email')
  },
})

export const public_createOnlineBooking = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('public_createOnlineBooking', {
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

        // if (!input.contact.contact_id) {
        //   const contact = await ctx.prisma.cmContact.findFirst({
        //     where: {
        //       Еmail: { equals: input.contact.email | undefined },
        //       company_id: input.data.company_id,
        //     },
        //     select: {
        //       ID: true,
        //     },
        //   })
        //
        //   console.log('CN', contact)
        //
        //   // const contact = createContact(ctx, {
        //   //   Fname: input.data.first_name,
        //   //   Lname: input.data.last_name,
        //   //   Email: input.data.email
        //   // })
        // }

        const services = await ctx.prisma.companyService.findMany({
          where: { id: { in: input.data.service_ids } },
        })

        const insertData = []
        let startDate = moment(input.data.start_date)
        let startDateAsInt = Number.parseInt(startDate.format('YYYYMMDDHHmm00'))
        for (const s of input.data.service_ids) {
          const service = services.find((serv) => serv.id === s)
          const duration = serviceTiers[s].duration
            ? serviceTiers[s].duration
            : hhmmToMinutes(service.duration)
          const cost = serviceTiers[s].cost
            ? serviceTiers[s].cost
            : service.price

          const endDate = moment(startDate).add(duration, 'minutes')
          const endDateAsInt = Number.parseInt(endDate.format('YYYYMMDDHHmmss'))

          const bookingData = {
            title: 'Online Booking',
            start_date: startDateAsInt,
            end_date: endDateAsInt,
            service: service.name,
            UID: input.data.user_id,
            company_id: input.data.company_id,
            create_date: Number.parseInt(moment().format('YYYYMMDDHHmmss')),
            status: 'Waiting',
            estimated_cost: cost,
            room_id: 0,
            unique_id: uuidv4(),
            repeat_id: 0,
            Online: 1,
            service_id: s,
            sent_sms: 1,
            sent_email: 1,
            location_id: input.data.location_id,
          }

          insertData.push(bookingData)

          startDate = moment(endDate)
          startDateAsInt = Number.parseInt(startDate.format('YYYYMMDDHHmm00'))
        }

        //   const res = await ctx.prisma.booking.create({
        //     data: {
        //       ...bookingData,
        //       contact: {
        //         connectOrCreate: {
        //           where: {
        //             email: 'nenad@pabau.com',
        //             company_id: input.data.company_id,
        //           },
        //           create: {
        //             email: 'nenadtest@pabau.com',
        //             Fname: 'Nenad 2',
        //             Lname: 'Autocreate',
        //           },
        //         },
        //       },
        //     },
        //     include: {
        //       Contact: true,
        //     },
        //   })
        // }
        //
        // console.log('REsult Log', res)

        const res = await ctx.prisma.cmContact.update({
          where: { ID: input.contact.contact_id },
          data: {
            Booking: {
              create: insertData,
            },
          },
        })

        return {
          success: !!res,
        }
      },
    })
  },
})
