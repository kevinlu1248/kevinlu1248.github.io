// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
	site: 'https://kevinlu1248.github.io',
	integrations: [mdx(), react(), sitemap()],
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
		shikiConfig: { theme: 'github-light' },
	},
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
