declare module '@sumsub/react-native-mobilesdk-module'
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare const global: {
  addEventListener: (type: string, listener: () => void) => void
  removeEventListener: (type: string, listener: () => void) => void
} & typeof globalThis

declare module '*.png'
