
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#EFF6FC',
					100: '#DFEDF9',
					200: '#BFD9F3',
					300: '#9EC7ED',
					400: '#7AB4E7',
					500: '#1E5180', // Warm navy
					600: '#144073',
					700: '#103060',
					800: '#0C244D',
					900: '#081537',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#EBF5FA',
					100: '#D7EBF5',
					200: '#AED7EB',
					300: '#86C3E0',
					400: '#5DAED6',
					500: '#1E5DAB', // Navy blue
					600: '#174A8B',
					700: '#12376C',
					800: '#0D254C',
					900: '#08142D',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: '#2E6E85',
					50: '#E6F1F5',
					100: '#CCE3EA',
					200: '#99C7D5',
					300: '#66AABF',
					400: '#338EAA',
					500: '#2E6E85',
					600: '#25586A',
					700: '#1C4350',
					800: '#122D35',
					900: '#09161B',
				},
				warning: {
					DEFAULT: '#F9A826',
					50: '#FEF6E7',
					100: '#FCEECF',
					200: '#F9DC9F',
					300: '#F9CB6F',
					400: '#F9A826',
					500: '#E08C0B',
					600: '#B37009',
					700: '#865407',
					800: '#593804',
					900: '#2D1C02',
				},
				// Warm accent colors to complement navy blue
				warm: {
					DEFAULT: '#E6846F',
					50: '#FCEFEC',
					100: '#F9DFD9',
					200: '#F3BFB3',
					300: '#ED9F8D',
					400: '#E6846F',
					500: '#DD5E43',
					600: '#C5422B',
					700: '#943220',
					800: '#622116',
					900: '#31110B',
				},
				cozy: {
					DEFAULT: '#D9B166',
					50: '#FAFCF7',
					100: '#F5F0E9',
					200: '#EBE1D4',
					300: '#E1D1BE',
					400: '#D9B166',
					500: '#C79B47',
					600: '#AD8230',
					700: '#866424',
					800: '#5A4319',
					900: '#2D210C',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"shimmer": {
					"100%": {
						transform: "translateX(100%)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				"shimmer": "shimmer 2s infinite",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
				serif: ["Playfair Display", "serif"],
			},
			boxShadow: {
				'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
				'elegant': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
				'soft': '0 5px 15px rgba(0, 0, 0, 0.05)',
			},
			backgroundImage: {
				'navy-gradient': 'linear-gradient(to right, #1E5DAB, #5DAED6, #1E5DAB)',
				'warm-gradient': 'linear-gradient(to right, #E6846F, #F9DFD9, #E6846F)',
				'cozy-gradient': 'linear-gradient(to right bottom, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
