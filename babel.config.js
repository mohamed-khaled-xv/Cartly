// babel.config.js
module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@': './src',
          '@api': './src/api',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@services': './src/services',
          '@infrastructure': './src/infrastructure',
          '@data': './src/data',
        },
      },
    ],
    // keep only if you actually use Reanimated:
    // 'react-native-reanimated/plugin',
  ],
};
