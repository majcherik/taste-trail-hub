
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
					50: '#FEF2ED',
					100: '#FCE5DA',
					200: '#F9CBB6',
					300: '#F5B091',
					400: '#F0966C',
					500: '#E86A33', // Our primary terracotta orange
					600: '#D14E18',
					700: '#A33C13',
					800: '#75290E',
					900: '#481709',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#E6F6FA',
					100: '#CCE7F0',
					200: '#99CDE1',
					300: '#66B4D1',
					400: '#339AC2',
					500: '#37A2B8', // Our secondary teal
					600: '#2C8193',
					700: '#21616F',
					800: '#16414A',
					900: '#0B2025',
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
					DEFAULT: '#2E856E',
					50: '#E6F5F1',
					100: '#CCE9E2',
					200: '#99D4C6',
					300: '#66BEAA',
					400: '#33A98D',
					500: '#2E856E',
					600: '#256A58',
					700: '#1C5042',
					800: '#12352C',
					900: '#091B16',
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
				gold: {
					DEFAULT: '#D4AF37',
					50: '#FCF8EB',
					100: '#F9F1D7',
					200: '#F3E4AF',
					300: '#EDD687',
					400: '#E7C85F',
					500: '#D4AF37',
					600: '#AD8C23',
					700: '#82691A',
					800: '#574611',
					900: '#2B2309',
				},
				champagne: {
					DEFAULT: '#F7E7CE',
					light: '#FDF5EA',
					dark: '#E8D0A9',
				},
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
				'gold-gradient': 'linear-gradient(to right, #D4AF37, #F5E1A5, #D4AF37)',
				'silver-gradient': 'linear-gradient(to right, #C0C0C0, #E8E8E8, #C0C0C0)',
				'marble': 'linear-gradient(to right bottom, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
