module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            
            animation: {
                shine: 'shine 2s linear infinite',
              },
              keyframes: {
                shine: {
                  '0%': { backgroundPosition: '0% 50%' },
                  '100%': { backgroundPosition: '200% 50%' },
                },
              },
        },

        fontFamily: {
            benton: ["BentonModDispLt", "sans-serif"],
            inter : ["inter" , "sans-serif"]
        },
    },
};
