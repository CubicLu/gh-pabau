import { objectType } from 'nexus'
import { Context } from '../../../context'

export const PublicStaffResponse = objectType({
  name: 'Public_Staff',
  definition(t) {
    t.int('ID')
    t.string('Avatar')
    t.string('Location')
    t.int('DefaultLocation')
    t.field('Public_User', {
      type: PublicUserResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.cmStaffGeneral
          .findUnique({
            where: { ID: parent.ID || undefined },
          })
          .User()
      },
    })
  },
})

export const PublicUserResponse = objectType({
  name: 'Public_User',
  definition(t) {
    t.int('id')
    t.string('full_name')
    t.string('image')
  },
})
