import { mutationField, nonNull, inputObjectType } from 'nexus'
import { Context } from '../../../context'
import dayjs from 'dayjs'

export const ShiftCreateInput = inputObjectType({
  name: 'ShiftCreateInput',
  definition(t) {
    t.nonNull.date('date')
    t.nonNull.string('start_time')
    t.nonNull.string('end_time')
    t.nonNull.list.int('user_ids')
    t.list.int('service_ids')
    t.int('location_id')
    t.int('room_id')
    t.string('note')
  },
})

export const createShiftMutation = mutationField('createShift', {
  type: 'Int',
  args: {
    data: nonNull('ShiftCreateInput'),
  },
  async resolve(_parent, { data }, ctx: Context) {
    const start_time_arr = data.start_time.split(':').map(function (item) {
      return Number.parseInt(item, 10)
    })

    const end_time_arr = data.end_time.split(':').map(function (item) {
      return Number.parseInt(item, 10)
    })

    const start = dayjs(`${data.date}`)
      .add(start_time_arr[0], 'hours')
      .add(start_time_arr[1], 'minutes')
      .format('YYYYMMDDHHmmss')

    const end = dayjs(`${data.date}`)
      .add(end_time_arr[0], 'hours')
      .add(end_time_arr[1], 'minutes')
      .format('YYYYMMDDHHmmss')

    console.info(
      'test:',
      dayjs(`${data.date}`)
        .add(end_time_arr[0], 'hours')
        .add(end_time_arr[1], 'minutes')
        .format('YYYYMMDDHHmmss')
    )

    const shift = {
      // CmStaffGeneral: { connect: { ID: data.user_ids[0] } },
      // Company: { connect: { id: ctx.authenticated.company } },
      user_created: ctx.authenticated.user,
      company_id: ctx.authenticated.company,
      notes: data.note ?? '',
      start: Number.parseFloat(start),
      end: Number.parseFloat(end),
      allowed_services: data.service_ids?.join(','),
      Location: undefined,
      CompanyRoom: undefined,
    }

    if (data.location_id) {
      shift.Location = { Location: { connect: { id: data.location_id } } }
    }
    if (data.room_id) {
      shift.CompanyRoom = { CompanyRoom: { connect: { id: data.room_id } } }
    }

    const shifts = []
    for (const uid of data.user_ids) {
      shifts.push({
        ...shift,
        uid: uid,
      })
    }

    const response = await ctx.prisma.rotaShift.createMany({
      data: shifts,
    })

    return response?.count ?? 0
  },
})
