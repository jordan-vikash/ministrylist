module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
        targets: {
          browsers: [
            '> 2%',
            'last 2 versions',
            'not dead',
          ]
        }
      }
    ]
  ],
  plugins: [],
};
