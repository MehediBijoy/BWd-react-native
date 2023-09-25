import Color from 'color'
import dayjs from 'dayjs'

import {ErrorObject} from 'api/Errors'
import {EstimateFee, User} from 'api/Response'
import {APP_BASE_URL} from 'config/environments'

export function isUserConfirmed(user: User) {
  return user && user.email_confirmed && user.kyc_status === 'approved'
}

export const isMfaRequired = (error: ErrorObject | null) => error && error.code === '005'

export const formatEstimatePay = (object: EstimateFee): EstimateFee => ({
  ...object,
  received_amount: parseFloat(object?.received_amount as unknown as string).toFixed(4),
  total_amount: parseFloat(object?.total_amount as unknown as string).toFixed(2),
  dynamic_fee_amount: parseFloat(object?.dynamic_fee_amount as unknown as string).toFixed(4),
})

/**
 * Shortens a given address string by replacing a portion of it with ellipsis ('...').
 *
 * @param {string} address - The full address string to be shortened.
 * @param {number} [preserve=5] - The number of characters to preserve at the beginning and end of the address.
 * @returns {string} The shortened address string with ellipsis in the middle.
 */
export const shortAddress = (address: string, preserve: number = 5): string =>
  address.slice(0, preserve) + '.'.repeat(3) + address.slice(-(preserve - 2))

export const makeReferralLink = (token: string) => {
  const rootUrl = APP_BASE_URL + `/invite?token=${token}`
  return rootUrl
}

export function getMonth(month: number, lang = 'en') {
  const date = new Date()
  date.setMonth(month - 1)

  return date.toLocaleString(lang, {month: 'long'})
}

/**
 * Formats a date string or Date object into a specified date format.
 *
 * @param {string | Date} date - The date to be formatted. It can be either a valid date string or a Date object.
 * @param {string} [format='MMM DD, YYYY, hh:mm A'] - The format to use for formatting the date.
 * @returns {string} The formatted date string.
 * @see {@link https://day.js.org/docs/en/display/format Format Function Documentation}
 */
export const formatDate = (date: string | Date, format: string = 'MMM DD, YYYY, hh:mm A'): string =>
  dayjs(date).format(format)

/**
 * Adjusts the opacity (alpha channel) of a color.
 *
 * @param {string} color - The color to adjust, represented as a valid CSS color string.
 * @param {number} opacity - The desired opacity level, a number between 0 (fully transparent) and 1 (fully opaque).
 * @returns {string} The color with the adjusted opacity as a CSS color string.
 */
export const alpha = (color: string, opacity: number): string =>
  Color(color).alpha(opacity).toString()
