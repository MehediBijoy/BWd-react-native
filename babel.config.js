module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          i18n: './src/i18n',
          utils: './src/utils',
          hooks: './src/hooks',
          images: './src/images',
          '@core': './src/@core',
          components: './src/components',
          config: './src/config',
          constants: './src/constants',
          screens: './src/screens',
          navigators: './src/navigators',
        },
      },
    ],
  ],
}
