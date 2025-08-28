module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'bg-gradient-to-r',
    'from-emerald-400',
    'to-emerald-600',
    'from-purple-400',
    'to-purple-600',
    'from-red-400',
    'to-red-600',
    'from-pink-400',
    'to-pink-600',
    {
      pattern: /^(from|to)-(emerald|purple|red|pink)-(400|600)$/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
