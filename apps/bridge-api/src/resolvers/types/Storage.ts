import { extendType, nonNull, intArg, list, objectType } from 'nexus'
import { Context } from '../../context'

export const uploadImage = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('uploadImage', {
      type: 'String',
      async resolve() {
        return ['a', 'b', 'c']
      },
    })
  },
})

const MoveAttachmentsResponse = objectType({
  name: 'moveAttachmentResponseResponse',
  definition(t) {
    t.boolean('success')
    t.int('album')
  },
})

export interface MoveAttachmentsOutput {
  success?: boolean
  album?: number
}

export interface MoveAttachmentsInput {
  albumId: number
  imageIds: number[]
}

export const MoveAttachments = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('moveAttachments', {
      type: MoveAttachmentsResponse,
      args: {
        albumId: nonNull(intArg()),
        imageIds: nonNull(list(intArg())),
      },
      resolve: async function (_, args: MoveAttachmentsInput, ctx: Context) {
        try {
          const { albumId, imageIds } = args
          const orWhere = imageIds?.map((el) => {
            return {
              id: { equals: Number(el) },
            }
          })

          const res = await ctx.prisma.contactAttachment.updateMany({
            where: {
              OR: orWhere,
            },
            data: {
              album_id: { set: albumId },
            },
          })
          if (res.count) {
            return {
              success: true,
              album: albumId,
            } as MoveAttachmentsOutput
          } else {
            return {
              success: false,
              album: albumId,
            } as MoveAttachmentsOutput
          }
        } catch {
          throw new Error('Something went wrong.')
        }
      },
    })
  },
})
