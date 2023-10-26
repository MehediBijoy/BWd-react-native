import Color from 'color'
import dayjs from 'dayjs'

/**
 * Shortens a given string by preserving a specified number of characters at both ends,
 * while replacing the middle portion with ellipsis ('...').
 *
 * @param {string} input - The input string to be shortened.
 * @param {number} preserve - The number of characters to preserve at the beginning and end of the input.
 * @param {number} [ellipsis=3] - The number of ellipsis characters to use in the middle.
 * @returns {string} The shortened string with ellipsis in the middle.
 */
export const shorten = (input: string, preserve: number = 3, ellipsis: number = 3): string =>
  input.slice(0, preserve) + '.'.repeat(ellipsis) + input.slice(-preserve)

/**
 * Shortens a given address string by replacing a portion of it with ellipsis ('...').
 *
 * @param {string} address - The full address string to be shortened.
 * @param {number} [preserve=5] - The number of characters to preserve at the beginning and end of the address.
 * @returns {string} The shortened address string with ellipsis in the middle.
 */
export const shortAddress = (address: string, preserve: number = 3): string =>
  address.slice(0, 2) + shorten(address.slice(2), preserve, 3)

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
export const formatDate = (
  date: string | Date = new Date(),
  format: string = 'MMM DD, YYYY, hh:mm A'
): string => dayjs(date).format(format)

/**
 * Adjusts the opacity (alpha channel) of a color.
 *
 * @param {string} color - The color to adjust, represented as a valid CSS color string.
 * @param {number} opacity - The desired opacity level, a number between 0 (fully transparent) and 1 (fully opaque).
 * @returns {string} The color with the adjusted opacity as a CSS color string.
 */
export const alpha = (color: string, opacity: number): string =>
  Color(color).alpha(opacity).toString()

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} input - The input string to be capitalized.
 * @returns {string} The input string with the first letter capitalized.
 */
export const capitalize = (input: string): string => input.charAt(0).toUpperCase() + input.slice(1)
