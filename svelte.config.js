import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
kit: {
adapter: adapter({
// Default is 3000, same as SvelteKit dev
port: 3000
})
},
preprocess: [mdsvex()],
extensions: ['.svelte', '.svx']
};

export default config;
