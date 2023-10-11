declare module '@sumsub/react-native-mobilesdk-module'

declare module '*.png'
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_MODE: 'dev' | 'prod'
    REACT_APP_EU_API_URL: string
    REACT_APP_US_API_URL: string
    REACT_APP_EU_APP_URL: string
    REACT_APP_US_APP_URL: string
    REACT_APP_CHAIN: string
  }
}
