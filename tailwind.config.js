module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                frizQuad: 'FrizQuadrata',
                BeaufortBold: 'BeaufortBold',
            },
            colors: {
                gold: '#AE914B',
                'gold-light': '#F4DE93',
                background: '#051420',
                'background-lightest': '#2f3948',
                'background-light': '#1a3e51',
                'background-dark': '#132225',
                'background-darkest': '#010a13',
                text: '#cdbe91',
                'text-highlight': '#f0e6d2',
                'text-light': '#908d82',
                'text-diffuse': '#414443',
                border: '#564624',
                'border-light': '#755c29',
                'border-dark': '#3E3023',
                'teal-light': '#A5F5D8',
                'teal-medium': '#3A7875',
                'teal-dark': '#14555B',
                'blue-team': '#0096FF',
                'red-team': '#C91D1D',
                experience: '#9D25E9',
                victory: '#0acbe6',
                defeat: '#eb2141',
                diamond: '#44578f',
                silver: '#d2e0df',
            },
        },
    },
    plugins: [],
}
