import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import { config } from 'dotenv'

config()
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), jsconfigPaths()],
	server: {
		proxy: {
			'^/upload': {
				// eslint-disable-next-line no-undef
				target: process.env.VITE_PUBLIC_SERVER_BASE_URL,
			},
		},
	},
})
