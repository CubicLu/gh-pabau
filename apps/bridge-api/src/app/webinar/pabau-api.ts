import fetch from 'node-fetch'
import { environment } from '../../environments/environment'
import { Context } from '../../context'

interface WebinarProp {
  course_id: number
  webinar_id: number
  course_date: string
  encore?: number
}

export const webinars = async (ctx: Context) => {
  const { username } = await ctx.prisma.user.findUnique({
    where: { id: ctx.authenticated.user },
    select: { username: true },
    rejectOnNotFound: true,
  })
  return fetch(environment.PABAU_WEBINAR_API, {
    body: `mode=get_trainings&company=${ctx.authenticated.company}&userEmail=${username}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }).then((result) => result.json())
}

export const filterWebinars = async (
  ctx: Context,
  trainer?: string,
  category?: string,
  difficulty?: string
) => {
  const { username } = await ctx.prisma.user.findUnique({
    where: { id: ctx.authenticated.user },
    select: { username: true },
    rejectOnNotFound: true,
  })
  return fetch(environment.PABAU_WEBINAR_API, {
    body: `mode=filter&company=${
      ctx.authenticated.company
    }&userEmail=${username}&category=${category ?? undefined}&trainer=${
      trainer ?? undefined
    }&difficulty=${difficulty ?? undefined}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }).then((result) => result.json())
}

export const register = async (
  ctx: Context,
  { course_id, webinar_id, course_date }: WebinarProp
) => {
  const { username } = await ctx.prisma.user.findUnique({
    where: { id: ctx.authenticated.user },
    select: { username: true },
    rejectOnNotFound: true,
  })
  return fetch(environment.PABAU_WEBINAR_API, {
    body: `mode=training_register&company=${ctx.authenticated.company}&userEmail=${username}&course_id=${course_id}&webinarId=${webinar_id}&course_date=${course_date}&encore=0`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
    .then((result) => result.json())
    .then((webinar) => webinar.msg)
}
