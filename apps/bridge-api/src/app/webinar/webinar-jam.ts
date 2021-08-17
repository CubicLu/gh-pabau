import fetch from 'node-fetch'
import { Registrant } from './types'

const webinarJamApiUrl = 'https://api.webinarjam.com/webinarjam/'

const header = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  method: 'POST',
}

const fetchWebinarApi = async (
  type: string,
  options?: { key: string; value: string }[]
) =>
  await fetch(`${webinarJamApiUrl}${type}`, {
    body: `api_key=${process.env.WEBINAR_JAM_API_KEY}${options?.map(
      (option) => `&${option?.key}=${option?.value}`
    )}`,
    ...header,
  }).then((result) => result.json())

export const findUnique = async (id: number) =>
  await fetch(`${webinarJamApiUrl}webinar`, {
    body: `api_key=${process.env.WEBINAR_JAM_API_KEY}&webinar_id=${id}`,
    ...header,
  })
    .then((result) => result.json())
    .then((result) => result.webinar)
export const findAll = async () => await fetchWebinarApi('webinars')

export const register = async (id: number, user: Registrant, webinar: number) =>
  await fetch(`${webinarJamApiUrl}webinar`, {
    body: `api_key=${process.env.WEBINAR_JAM_API_KEY}&webinar_id=${id}&first_name=${user.first_name}&last_name=${user.last_name}&phone=${user.phone}&email=${user.email}&schedule=${webinar}`,
    ...header,
  })
    .then((result) => result.json())
    .then((result) => result.webinar)
