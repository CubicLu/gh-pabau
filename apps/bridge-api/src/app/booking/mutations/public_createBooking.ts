import {
  extendType,
  inputObjectType,
  nullable,
  objectType,
  list,
  nonNull,
} from 'nexus'
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
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('mobile')
    t.string('country')
    t.string('password')
    t.boolean('marketing')
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
        contact: nonNull(list(PCBContact)),
      },
      async resolve(_, input, ctx: Context) {
        let contact_id
        const serviceTiers = await getTier(
          input.data.service_ids,
          input.data.user_id,
          input.data.location_id,
          ctx
        )

        const services = await ctx.prisma.companyService.findMany({
          where: { id: { in: input.data.service_ids } },
        })

        let startDate = moment(input.data.start_date)
        let startDateAsInt = Number.parseInt(startDate.format('YYYYMMDDHHmm00'))
        let allGood = true
        // Loop each contact sent
        for (const i in Object.keys(input.contact)) {
          const insertData = []
          // We are NOT receiving an ID
          if (!input.contact[i].contact_id) {
            // Find contact by email or mobile
            const contact = await ctx.prisma.cmContact.findFirst({
              where: {
                OR: [
                  {
                    Email: input.contact[i].email
                      ? input.contact[i].email
                      : undefined,
                  },
                  {
                    Mobile: input.contact[i].mobile
                      ? input.contact[i].mobile
                      : undefined,
                  },
                ],
              },
            })
            //Contact is found, set ID
            if (contact) {
              contact_id = contact.ID
            } else {
              const data = await ctx.prisma.$queryRaw`
                SELECT IFNULL(MAX(CAST(a.custom_id AS INTEGER)) + 1,1) as max FROM cm_contacts a WHERE a.Occupier = ${input.data.company_id}
              `
              const new_custom_id = data[0].max.toString()

              const contact = await ctx.prisma.cmContact.create({
                data: {
                  Fname: input.contact[i].firstName,
                  Lname: input.contact[i].lastName,
                  Email: input.contact[i].email,
                  Mobile: input.contact[i].mobile,
                  MarketingOptInNewsletter: 1,
                  MailingCountry: input.contact[i].country,
                  custom_id: new_custom_id,
                  Phone: '',
                  MailingStreet: '',
                  MailingCity: '',
                  MailingProvince: '',
                  MailingPostal: '',
                  OwnerID: input.data.user_id,
                  Company: {
                    connect: {
                      id: input.data.company_id,
                    },
                  },
                },
              })

              contact_id = contact.ID
              return { success: false }
            }
          } else {
            contact_id = input.contact[i].contact_id
          }

          // Loop each service booked
          for (const s of input.data.service_ids) {
            const service = services.find((serv) => serv.id === s)
            const duration = serviceTiers[s].duration
              ? serviceTiers[s].duration
              : hhmmToMinutes(service.duration)
            const cost = serviceTiers[s].cost
              ? serviceTiers[s].cost
              : service.price

            const endDate = moment(startDate).add(duration, 'minutes')
            const endDateAsInt = Number.parseInt(
              endDate.format('YYYYMMDDHHmm00')
            )

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

          const res = await ctx.prisma.cmContact.update({
            where: { ID: contact_id },
            data: {
              Booking: {
                create: insertData,
              },
            },
          })

          allGood = allGood && !!res
        }

        return {
          success: allGood,
        }
      },
    })
  },
})
