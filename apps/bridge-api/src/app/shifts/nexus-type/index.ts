import { objectType } from 'nexus'
import { Context } from '../../../context'
import { PublicUserResponse } from '../../staff'

export const PublicShiftResponse = objectType({
  name: 'PublicShiftResponse',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.float('start')
    t.float('end')
    t.int('room_id')
    t.int('location_id')
    t.field('Public_User', {
      type: PublicUserResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.cmStaffGeneral
          .findUnique({
            where: { ID: parent.uid || undefined },
          })
          .User()
      },
    })
  },
})
