// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://kevinlu1248.github.io',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			// Free match for Adobe Garamond Pro used on jasonwei.net
			provider: fontProviders.google(),
			name: 'EB Garamond',
			cssVariable: '--font-serif',
			weights: [400, 500, 600],
			styles: ['normal', 'italic'],
			fallbacks: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
		},
	],
});
