import { extendType, intArg, objectType, nonNull, list } from 'nexus'
import { Context } from '../../context'
import FormData from 'form-data'
import fetch from 'node-fetch'

const DeleteContactAttachmentResponse = objectType({
  name: 'deleteContactAttachmentResponse',
  definition(t) {
    t.boolean('success')
    t.string('code')
    t.string('message')
    t.string('error')
    t.int('photo')
  },
})

const DeleteContactAlbumResponse = objectType({
  name: 'deleteContactAlbumResponse',
  definition(t) {
    t.boolean('success')
    t.string('code')
    t.string('message')
    t.string('error')
    t.int('album')
  },
})

const DeleteManyContactAttachmentResponse = objectType({
  name: 'deleteManyContactAttachmentResponse',
  definition(t) {
    t.boolean('success')
    t.int('count')
  },
})

export interface DeleteOutput {
  success?: boolean
  code?: string
  message?: string
  error?: string
  photo?: number
}

export interface BulkDeleteJsonInput {
  files: string[]
}

export interface DeleteManyOutput {
  success?: boolean
  count?: number
}

export interface DeleteContactAttachmentInput {
  id: number
}

export interface DeleteManyContactAttachmentInput {
  ids: number[]
}

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

export const DeleteContactAttachment = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteContactAttachment', {
      type: DeleteContactAttachmentResponse,
      args: {
        id: intArg(),
      },
      resolve: async function (
        _,
        args: DeleteContactAttachmentInput,
        ctx: Context
      ) {
        const { id } = args

        try {
          const attachment = await ctx.prisma.contactAttachment.findFirst({
            where: {
              id: { equals: id },
              company_id: { equals: ctx.authenticated.company },
            },
            select: {
              linkref: true,
            },
          })

          const postData = new FormData()
          postData.append('file_path', attachment.linkref)

          const response = await fetch(
            'https://cdn.pabau.com/v2/api/contact/delete-attachment',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${ctx.authJwt}`,
              },
              redirect: 'follow',
              body: postData,
            }
          )

          const res: DeleteOutput = await response.json()

          if (res.success === true) {
            await ctx.prisma.contactAttachment.delete({
              where: {
                id: id,
              },
            })
          }

          return { ...res, photo: id } as DeleteOutput
        } catch {
          return { success: false, photo: id } as DeleteOutput
        }
      },
    })
  },
})

export const DeleteManyContactAttachment = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyContactAttachment', {
      type: DeleteManyContactAttachmentResponse,
      args: {
        ids: nonNull(list(intArg())),
      },
      resolve: async function (
        _,
        args: DeleteManyContactAttachmentInput,
        ctx: Context
      ) {
        const { ids } = args

        try {
          const attachments = await ctx.prisma.contactAttachment.findMany({
            where: {
              id: { in: ids },
              company_id: { equals: ctx.authenticated.company },
            },
            select: {
              linkref: true,
            },
          })

          const files = []

          for (const attachment of attachments.values()) {
            files.push(attachment['linkref'])
          }

          console.log(files)

          const postData: BulkDeleteJsonInput = { files: files }

          console.log(JSON.stringify(postData))

          const response = await fetch(
            'https://cdn.pabau.com/v2/api/contact/bulk-delete-attachment',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${ctx.authJwt}`,
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              body: JSON.stringify(postData),
            }
          )

          const res: DeleteOutput = await response.json()

          if (res.success === true) {
            await ctx.prisma.contactAttachment.deleteMany({
              where: {
                id: { in: ids },
              },
            })
            return { success: true, count: ids?.length } as DeleteManyOutput
          } else {
            return { success: false, count: 0 } as DeleteManyOutput
          }
        } catch {
          return { success: false, count: 0 } as DeleteManyOutput
        }
      },
    })
  },
})

export const DeleteContactAlbum = extendType({
  type: 'Mutation',

  definition(t) {
    t.field('deleteContactAlbum', {
      type: DeleteContactAlbumResponse,

      args: {
        id: nonNull(intArg()),
      },

      resolve: async function (
        _,
        args: DeleteContactAttachmentInput,
        ctx: Context
      ) {
        const { id } = args

        try {
          const attachments = await ctx.prisma.contactAttachment.findMany({
            where: {
              album_id: { equals: id },
              company_id: { equals: ctx.authenticated.company },
            },
            select: {
              linkref: true,
            },
          })

          const files = []

          for (const [attachment] of attachments.entries()) {
            files.push(attachment['linkref'])
          }

          const postData: BulkDeleteJsonInput = { files: files }

          const response = await fetch(
            'https://cdn.pabau.com/v2/api/contact/bulk-delete-attachment',

            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${ctx.authJwt}`,
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              body: JSON.stringify(postData),
            }
          )

          const res: DeleteOutput = await response.json()

          if (res.success === true) {
            await ctx.prisma.photoAlbum.delete({
              where: {
                id: id,
              },
            })

            await ctx.prisma.contactAttachment.deleteMany({
              where: {
                album_id: id,
              },
            })
            return { ...res, album: id } as DeleteOutput
          } else {
            return { success: false, album: id } as DeleteOutput
          }
        } catch {
          return { success: false, album: id } as DeleteOutput
        }
      },
    })
  },
})
