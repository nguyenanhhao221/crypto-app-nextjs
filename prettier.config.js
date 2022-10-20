// prettier.config.js
module.exports = {
  tailwindConfig: './tailwind.config.js',
  plugins: [require('prettier-plugin-tailwindcss')],
  trailingComma: 'es5',
  tabWidth: 4,
  semi: true,
  singleQuote: true,
};
