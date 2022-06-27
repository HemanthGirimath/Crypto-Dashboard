
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
       colors:{
      transparent:'transaparent',
      current:'current',
      white:'#ffffff',
      
      Black:"#0c0b10",
      Dashboard:'#232227',

      
      Green1:'#22c55e',
      Card1Color1:'#1b1a1f',
      Card1Color2:'#f3bb66',

      Card2Color1:'#1e1f24',
      Card2Color2:'#1ec1a6',

      Card3Color1:'#222127',
      Card3Color2:'#ed7769',
      // card1-color:#1b1a1f,#f3bb66;  
      // card-2-color:#1e1f24,#1ec1a6;
      // card-3-color:#222127,#ed7769;
      // over-all-bg-color:#0c0b10
    },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
