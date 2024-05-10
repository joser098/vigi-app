/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: "#1E053F",
				back: "#f5f5f7",
				green_: "#33BF5E"
			},
			keyframes: {
				slideDown: {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				  },
				  slideUp: {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				  },
				  hide: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				  },
				  slideIn: {
					from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
					to: { transform: 'translateX(0)' },
				  },
				  swipeOut: {
					from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
					to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
				  },
			},
			animation: {
				slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
				slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
				hide: 'hide 100ms ease-in',
				slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				swipeOut: 'swipeOut 100ms ease-out',

			}
		},
	},
	plugins: [],
}
