module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          components: './src/components',
          hooks: './src/hooks',
          config: './src/config',
          screens: './src/screens',
          navigators: './src/navigators',
        },
      },
    ],
  ],
}
