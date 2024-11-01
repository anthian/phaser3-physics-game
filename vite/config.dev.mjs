import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';

export default defineConfig({
	base: './',
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					phaser: ['phaser']
				}
			},
			plugins: [
				replace({
					'typeof CANVAS_RENDERER': "'true'",
					'typeof WEBGL_RENDERER': "'true'",
					'typeof EXPERIMENTAL': "'true'",
					'typeof PLUGIN_CAMERA3D': "'false'",
					'typeof PLUGIN_FBINSTANT': "'false'",
					'typeof FEATURE_SOUND': "'true'"
				})
			]
		},
	},
	server: {
		port: 3000
	}
});
