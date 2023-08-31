module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          utils: './src/utils',
          hooks: './src/hooks',
          images: './src/images',
          '@core': './src/@core',
          components: './src/components',
          config: './src/config',
          screens: './src/screens',
          navigators: './src/navigators',
        },
      },
    ],
  ],
}
