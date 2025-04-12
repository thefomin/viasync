import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class', 'class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	prefix: '',
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
				'color-default': 'rgba(var(--color-default))',
				'color-gray': 'rgba(var(--color-gray))',
				'color-brown': 'rgba(var(--color-brown))',
				'color-orange': 'rgba(var(--color-orange))',
				'color-yellow': 'rgba(var(--color-yellow))',
				'color-green': 'rgba(var(--color-green))',
				'color-blue': 'rgba(var(--color-blue))',
				'color-purple': 'rgba(var(--color-purple))',
				'color-pink': 'rgba(var(--color-pink))',
				'color-red': 'rgba(var(--color-red))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				bg__primary: {
					DEFAULT: 'hsl(var(--bg-primary))',
					foreground: 'hsl(var(--bg-primary-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				third: {
					DEFAULT: 'hsl(var(--third))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				apply: {
					DEFAULT: 'hsl(var(--apply))',
					foreground: 'hsl(var(--apply-foreground))'
				},
				apply__hover: {
					DEFAULT: 'hsl(var(--apply-hover))',
					foreground: 'hsl(var(--apply-foreground-hover))'
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
					foreground: 'hsl(var(--card-foreground))',
					primary: 'hsl(var(--card-primary))',
					secondary: 'hsl(var(--card-secondary))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground':
						'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground':
						'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				sans: ['var(--font-geist-sans)']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			ringWidth: {
				DEFAULT: '0px'
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography')
	]
} satisfies Config

export default config
