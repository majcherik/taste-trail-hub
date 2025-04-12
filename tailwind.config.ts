
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
					50: '#FFF3E5',
					100: '#FFE7CC',
					200: '#FFD099',
					300: '#FFB966',
					400: '#FFA233',
					500: '#FF8C00', // Warm orange
					600: '#CC7000',
					700: '#995400',
					800: '#663800',
					900: '#331C00',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#FEF6E7',
					100: '#FCEECF',
					200: '#F9DC9F',
					300: '#F9CB6F',
					400: '#F9A826',
					500: '#F97316', // Bright orange
					600: '#DA5B11',
					700: '#B1460D',
					800: '#883108',
					900: '#5E2104',
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
					DEFAULT: '#4CAF50',
					50: '#E8F5E9',
					100: '#C8E6C9',
					200: '#A5D6A7',
					300: '#81C784',
					400: '#66BB6A',
					500: '#4CAF50',
					600: '#43A047',
					700: '#388E3C',
					800: '#2E7D32',
					900: '#1B5E20',
				},
				warning: {
					DEFAULT: '#FF9800',
					50: '#FFF3E0',
					100: '#FFE0B2',
					200: '#FFCC80',
					300: '#FFB74D',
					400: '#FFA726',
					500: '#FF9800',
					600: '#FB8C00',
					700: '#F57C00',
					800: '#EF6C00',
					900: '#E65100',
				},
				// Warm accent colors
				warm: {
					DEFAULT: '#FEC6A1',
					50: '#FFF7F3',
					100: '#FEF0E7',
					200: '#FEE0D0',
					300: '#FED3B8',
					400: '#FEC6A1',
					500: '#FEA36D',
					600: '#FD7F38',
					700: '#FC5C04',
					800: '#D14A02',
					900: '#9B3701',
				},
				cozy: {
					DEFAULT: '#D46A6A',
					50: '#FAF0F0',
					100: '#F5E0E0',
					200: '#EBC2C2',
					300: '#E0A3A3',
					400: '#D46A6A',
					500: '#C94646',
					600: '#AB3232',
					700: '#832626',
					800: '#581A1A',
					900: '#2C0D0D',
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
				'navy-gradient': 'linear-gradient(to right, #FF8C00, #FFA233, #FF8C00)',
				'warm-gradient': 'linear-gradient(to right, #FEC6A1, #FEF0E7, #FEC6A1)',
				'cozy-gradient': 'linear-gradient(to right bottom, #f5f5f5, #eee, #f5f5f5, #eee, #f5f5f5)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
