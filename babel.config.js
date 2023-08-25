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
          config: './src/config',
          screens: './src/screens',
          components: './src/components',
          navigators: './src/navigators',
        },
      },
    ],
  ],
}
