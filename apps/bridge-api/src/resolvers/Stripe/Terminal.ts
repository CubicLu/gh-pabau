import { extendType, nonNull, objectType, stringArg } from 'nexus'
import Stripe from 'stripe'
import { Context } from '../../context'

interface StripeTerminal {
  id?: string
  object?: string
  device_sw_version?: string
  ip_address: string
  label: string
  livemode: boolean
  location: string
  serial_number: string
  status: string
  metadata: string
}
const StripeTerminal = objectType({
  name: 'StripeTerminal',
  definition(t) {
    t.string('id')
    t.string('object')
    t.string('device_sw_version')
    t.string('ip_address')
    t.string('label')
    t.boolean('livemode')
    t.string('location')
    t.string('serial_number')
    t.string('status')
    t.json('metadata')
  },
})

const StripeTerminalLocation = objectType({
  name: 'StripeTerminalLocation',
  definition(t) {
    t.string('id')
    t.string('object')
    t.json('address')
    t.string('display_name')
    t.string('livemode')
    t.json('metadata')
  },
})
const StripeConnectionToken = objectType({
  name: 'StripeConnectionToken',
  definition(t) {
    t.string('object')
    t.string('secret')
  },
})

export const createStripeTerminalLocation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createStripeTerminalLocation', {
      type: StripeTerminalLocation,
      description: 'Create a Stripe Terminal Location',
      async resolve({ prisma, authenticated }: Context) {
        const companyDetails = await prisma?.companyDetails.findFirst({
          where: {
            company_id: authenticated?.company,
          },
        })
        const countries = await prisma?.country.findFirst({
          where: {
            country_name: companyDetails.country,
          },
        })
        try {
          const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
            apiVersion: '2020-08-27',
          })

          const location = await stripe.terminal.locations.create({
            display_name: companyDetails.company_name,
            address: {
              line1: companyDetails.street,
              city: companyDetails.city,
              country: countries.CountryCode,
              postal_code: companyDetails.post_code,
            },
          })
          await prisma.$queryRaw`INSERT INTO company_meta
          (company_id, meta_name, meta_value)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE meta_value = ?
            ${authenticated?.company}
            'stripe_company_terminal_location'
            ${location.id}
            ${location.id}`

          return location
        } catch (error) {
          return error
        }
      },
    })
  },
})

export const connectTerminal = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('connectTerminal', {
      type: StripeTerminal,
      description: 'Connect a Terminal to a certain Stripe Account',
      args: {
        code: nonNull(stringArg()),
      },
      async resolve(_, input, { prisma, authenticated }: Context) {
        const stripeTerminalLocationID = await prisma?.companyMeta.findFirst({
          where: {
            company_id: authenticated?.company,
            meta_name: 'stripe_company_terminal_location',
          },
        })
        const companyDetails = await prisma?.companyDetails.findFirst({
          where: {
            company_id: authenticated?.company,
          },
        })
        try {
          const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
            apiVersion: '2020-08-27',
          })
          const reader_response = await stripe.terminal.readers.create({
            registration_code: input.code,
            label: companyDetails.company_name + ' Reader',
            location: stripeTerminalLocationID.meta_value,
          })
          return reader_response
        } catch (error) {
          return error
        }
      },
    })
  },
})

export const fetchTerminalToken = extendType({
  type: 'Query',
  definition(t) {
    t.field('fetchTerminalToken', {
      type: StripeConnectionToken,
      description: 'Get a Connection Token for Terminal Reader',
      async resolve() {
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const connectionToken = await stripe.terminal.connectionTokens.create()
        return connectionToken
      },
    })
  },
})

export const registeredTerminals = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('registeredTerminals', {
      type: StripeTerminal,
      description: 'Get a list of registered terminals',
      async resolve(_, input, { prisma, authenticated }: Context) {
        const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
          apiVersion: '2020-08-27',
        })
        const stripeTerminalLocationID = await prisma.companyMeta.findFirst({
          where: {
            company_id: authenticated?.company,
            meta_name: 'stripe_company_terminal_location',
          },
        })
        const readers = await stripe.terminal.readers.list({
          location: stripeTerminalLocationID.meta_value,
        })

        return (readers.data as any) as StripeTerminal[]
      },
    })
  },
})
