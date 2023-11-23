export const ENV = process.env.REACT_APP_MODE || 'prod'

export const EU_API_URL = process.env.REACT_APP_EU_API_URL || 'http://192.168.2.109:3000'
export const US_API_URL = process.env.REACT_APP_US_API_URL || 'https://api.brettonwoods.us.com'

export const US_APP_URL = process.env.REACT_APP_US_APP_URL || 'https://app.brettonwoods.us.com'
export const EU_APP_URL = process.env.REACT_APP_EU_APP_URL || 'https://app.brettonwoods.gold'

export const CHAIN = parseInt(process.env.REACT_APP_CHAIN || '56')
