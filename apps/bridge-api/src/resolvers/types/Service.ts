import { Context } from '../../context'
import { extendType, intArg, nonNull } from 'nexus'
import { getServicesByStaff } from '../../app/service/service.service'
import { StaffServices } from '../../app/service/nexus-type'

export const getStaffServices = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getStaffServices', {
      type: StaffServices,
      description:
        'Returns all services that can be performed by specific staff member',
      args: {
        staffId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx: Context) {
        return await getServicesByStaff(args.staffId, ctx)
      },
    })
  },
})
